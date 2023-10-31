const mongoose = require('mongoose');

const Property = new mongoose.model('Property', new mongoose.Schema({
  name: String,
  slug: String,
  address: [{
    street_1: String,
    street_2: String,
    city: String,
    state: String,
    zip: String,
  }],
  description: String,
  background_image: String,
  platforms: [{
    id: Number,
    name: String,
    slug: String,
    url: String,
  }],
  bedrooms: Number,
  bathrooms: Number,
  days_booked: Number,
  propertyTypes: Number
}));

exports.Property = Property;