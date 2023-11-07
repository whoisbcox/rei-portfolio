const Joi = require('joi');
const mongoose = require('mongoose');

const Properties = mongoose.model('Properties', new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 255 },
  slug: String,
  address: {
    street_1: String,
    street_2: String,
    city: String,
    state: String,
    zip: String,
  },
  description: String,
  featured_image: String,
  platforms: [{
    id: Number,
    name: String,
    slug: String,
    url: String,
  }],
  bedrooms: Number,
  bathrooms: Number,
  days_booked: Number,
  propertyTypes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PropertyTypes'
  }
}));

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
    featured_image: Joi.string().uri().allow(null, '').required(),
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

exports.Properties = Properties;
exports.validate = validateProperty;