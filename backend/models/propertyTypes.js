const mongoose = require('mongoose');

const PropertyTypes = mongoose.model('PropertyTypes', new mongoose.Schema({
  icon: Number,
  name: String
}));

exports.PropertyTypes = PropertyTypes;