const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const auth = require('../middleware/auth');
const { Properties, validate } = require('../models/properties');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', async(req, res) => {
  // Parse query parameters for propertyTypes
  const selectedPropertyTypes = req.query.propertyTypes;
  
  // Store sorting option if provided
  const ordering = req.query.ordering ? req.query.ordering : undefined;
  
  // Store sorting option if provided
  const search = req.query.search ? req.query.search : undefined;

  // Parse bedroom and bathroom filters if provided
  const min_bedrooms = req.query.min_bedrooms ? parseInt(req.query.min_bedrooms) : undefined;
  const max_bedrooms = req.query.max_bedrooms ? parseInt(req.query.max_bedrooms) : undefined;
  const min_bathrooms = req.query.min_bathrooms ? parseInt(req.query.min_bathrooms) : undefined;
  const max_bathrooms = req.query.max_bathrooms ? parseInt(req.query.max_bathrooms) : undefined;

  // Start with all properties
  let filteredResults = await Properties.find().populate('propertyTypes');

  // Filter based on selected property types, if provided
  if (selectedPropertyTypes) {
    filteredResults = filteredResults.filter((property) => property.propertyTypes._id.toHexString() === selectedPropertyTypes);
  }

  // Filter based on bedrooms, if filter parameters are provided
  if (min_bedrooms !== undefined || max_bedrooms !== undefined) {
    filteredResults = filteredResults.filter((property) => {
      const bedrooms = property.bedrooms || 0;
      return (
        (min_bedrooms === undefined || bedrooms >= min_bedrooms) &&
        (max_bedrooms === undefined || bedrooms <= max_bedrooms)
      );
    });
  }

  // Filter based on bathrooms, if filter parameters are provided
  if (min_bathrooms !== undefined || max_bathrooms !== undefined) {
    filteredResults = filteredResults.filter((property) => {
      const bathrooms = property.bathrooms || 0;
      return (
        (min_bathrooms === undefined || bathrooms >= min_bathrooms) &&
        (max_bathrooms === undefined || bathrooms <= max_bathrooms)
      );
    });
  }
  
  // Sorting
  if (typeof ordering !== 'undefined' && filteredResults) {
    const sortFunctions = {
      'name': (a, b) => a.name.localeCompare(b.name),
      'availability': (a, b) => a.days_booked - b.days_booked,
    };
  
    filteredResults.sort(sortFunctions[ordering]);
  } else {
    filteredResults.sort((a, b) => a.id - b.id);
  }

  if (search) {
    filteredResults = filteredResults.filter((property) => {
      // console.log(property.address);
      // const street1Match = property.address.street_1.toLowerCase().includes(search.toLowerCase());
      // const street2Match = property.address.street_2.toLowerCase().includes(search.toLowerCase());
      const nameMatch = property.name.toLowerCase().includes(search.toLowerCase());
      return nameMatch;
    });
  }
  
  const { s3, s3GetObjectCommand, bucketName } = req;
  for(const filteredResult of filteredResults) {
    filteredResult.featured_image_url = '';
    
    if (filteredResult.featured_image) {
      const params = {
        Bucket: bucketName,
        Key: filteredResult.featured_image,
      };
      
      const command = await new s3GetObjectCommand(params);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      
      filteredResult.featured_image_url = url;
    }
  }
  
  res.status(200).send({ ...filteredResults });
});

router.get('/:id', async (req, res) => {
  const property = await Properties.findById(req.params.id);
  if (!property) return res.status(400).send('The property with the given ID was not found');
  
  property.featured_image_url = '';
  if (property.featured_image) {
    const { s3, s3GetObjectCommand, bucketName } = req;
    const params = {
      Bucket: bucketName,
      Key: property.featured_image,
    };
    const command = await new s3GetObjectCommand(params);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    property.featured_image_url = url;
  }
  
  res.status(200).send(property);
});

router.post('/', upload.single('featured_image'), async (req, res) => {
  const { error, value } = validate(req.body);
  if ( error ) return res.status(400).send(error.message);
  
  const { s3, s3PutObjectCommand, bucketName } = req;
  const hash = crypto.createHash('sha256');
  hash.update(req.file.buffer);
  const fileKey = `${hash.digest('hex')}_${req.file.originalname}`;

  const params = {
    Bucket: bucketName,
    Key: fileKey,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  }
  const command = new s3PutObjectCommand(params);
  await s3.send(command);
  
  let property = new Properties({ ...req.body, featured_image: fileKey });

  property = await property.save();
  res.send(property);
});

router.put('/:id', upload.single('featured_image'), async (req, res) => {
  const { error, value } = validate(req.body);
  if ( error ) return res.status(400).send(error.message);
  let newFeatImage = req.body.featured_image_url ? {} : { featured_image: 'https://placehold.co/200' };

  if (req.file) {
    const { s3, s3PutObjectCommand, bucketName } = req;
    const hash = crypto.createHash('sha256');
    hash.update(req.file.buffer);
    const fileKey = `${hash.digest('hex')}_${req.file.originalname}`;
  
    const params = {
      Bucket: bucketName,
      Key: fileKey,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    }
    const command = new s3PutObjectCommand(params);
    await s3.send(command);
    newFeatImage.featured_image = fileKey;
  }
  
  const property = await Properties.findByIdAndUpdate(req.params.id, { ...req.body, ...newFeatImage}, {new: true});
  if (!property) return res.status(404).send('The property with the given ID was not found');
  console.log(property);

  res.send(property);
});

router.delete('/:id', auth, async(req, res) => {
  const property = await Properties.findByIdAndRemove(req.params.id); 
  if (!property) return res.status(400).send('The property with the given ID was not found');

  res.send(property);
});

module.exports = router;