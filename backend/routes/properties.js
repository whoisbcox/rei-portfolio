const Joi = require('joi');
const { Properties } = require('../models/properties');
const express = require('express');
const router = express.Router();

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

router.post('/', async (req, res) => {
  const { error, value } = validateProperty(req.body);
  if ( error ) return res.status(400).send(error.message);
  
  let property = new Properties({ ...req.body });

  property = await property.save();
  res.send(property);
});

router.delete('/:id', async(req, res) => {
  const property = await Properties.findByIdAndRemove(req.params.id); 
  if (!property) return res.status(400).send('The property with the given ID was not found');

  res.send(property);
});

function validateProperty(property) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    address: Joi.object({
      street_1: Joi.string().min(3).max(50).required(),
      street_2: Joi.string().allow(null, '').required(),
      city: Joi.string().min(3).max(50).required(),
      state: Joi.string().length(2).required(),
      zip: Joi.string().regex(/^\d{5}(?:-\d{4})?$/),
    }),
    description: Joi.string().min(3).required(),
    background_image: Joi.string().uri().allow(null, '').required(),
    platforms: Joi.array().items(Joi.object({
      name: Joi.string(),
      slug: Joi.string(),
      url: Joi.string().uri(),
    })).allow(null, ''),
    bedrooms: Joi.number().integer().min(0).required(),
    bathrooms: Joi.number().integer().min(0).required(),
    days_booked: Joi.number().integer().min(0).max(100).allow(null, ''),
    propertyTypes: Joi.string().required()
  });

  return schema.validate(property);
}

module.exports = router;