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
  propertyTypes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PropertyTypes'
  }
}));

exports.Properties = Properties;