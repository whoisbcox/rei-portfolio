const Joi = require('joi');
const mongoose = require('mongoose');

const PropertyTypes = mongoose.model('PropertyTypes', new mongoose.Schema({
  icon: Number,
  name: String,
  name_singular: String
}));

function validatePropertyType(propertyType) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    name_singular: Joi.string().min(5).max(255),
    icon: Joi.number().required()
  });

  return schema.validate(propertyType);
}

exports.PropertyTypes = PropertyTypes;
exports.validate = validatePropertyType;