const auth = require('../middleware/auth');
const { Properties, validate } = require('../models/properties');
const express = require('express');
const router = express.Router();
// const s3UploadMiddleware = require('./middleware/s3UploadMiddleware');
const multer = require('multer');
const fs = require('fs');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// const s3 = new S3Client({
//   credentials: {
//     accessKey: accessKey,
//     secretAccessKey: secretAccessKey,
//   },
//   region: bucketRegion
// });
// const myBucketName = BUCKET_NAME;
// const myNewFileNameKey = 'file.jpg';
// const myFilePath = './images/1.jpg';

// function uploadFile(filePath, bucketName, newFileNameKey){
//   const fileStream = fs.createReadStream(filePath);
//   fileStream.on('error', (err) => {
//     console.log('File Error', err);
//   });

//   const params = {
//     Bucket: bucketName,
//     Key: newFileNameKey,
//     Body: fileStream,
//     ContentEncoding: 'base64',
//     ContentType: 'image/jpeg',
//     ACL:'public-read'
//   };

//   s3.upload(params, (err, data) => {
//     if (err) {
//       console.log('Error: ', err);
//     };
//     if (data) {
//       console.log('Success: ', data.Location);
//     }
//   })
// }

// uploadFile(myFilePath, myBucketName, myNewFileNameKey);

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
      console.log(property.address);
      // const street1Match = property.address.street_1.toLowerCase().includes(search.toLowerCase());
      // const street2Match = property.address.street_2.toLowerCase().includes(search.toLowerCase());
      const nameMatch = property.name.toLowerCase().includes(search.toLowerCase());
      return nameMatch;
    });
  }
  
  res.status(200).send({ ...filteredResults });
});

router.get('/:id', async (req, res) => {
  const property = await Properties.findById(req.params.id);
  if (!property) return res.status(400).send('The property with the given ID was not found');
  res.status(200).send(property);
});

// router.post('/', async (req, res) => {
//   const { error, value } = validate(req.body);
//   console.log(error);
//   if ( error ) return res.status(400).send(error.message);
  
//   let property = new Properties({ ...req.body });

//   property = await property.save();
//   res.send(property);
// });

router.post('/', upload.single('featuredImage'), async (req, res) => {
  // Access the S3 client and PutObjectCommand
  const { s3, s3PutObjectCommand, bucketName } = req;
  // console.log("req.body ", req.body);
  // console.log("req.file ", req.file.buffer);

  const params = {
    Bucket: bucketName,
    Key: req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype
  }
  // console.log(params);
  const command = new s3PutObjectCommand(params);
  await s3.send(command);
  // const { error, value } = validate(req.body);
  // console.log(error);
  // if ( error ) return res.status(400).send(error.message);
  
  // let property = new Properties({ ...req.body });

  // property = await property.save();
  res.send({});
});

router.delete('/:id', auth, async(req, res) => {
  const property = await Properties.findByIdAndRemove(req.params.id); 
  if (!property) return res.status(400).send('The property with the given ID was not found');

  res.send(property);
});

module.exports = router;