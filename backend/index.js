const mongoose = require('mongoose');
const properties = require('./routes/properties');
const propertyTypes = require('./routes/propertyTypes');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;

mongoose.connect('mongodb://127.0.0.1:27017/reiportfolio')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const propertySchema = new mongoose.Schema({
  name: String,
  slug: String,
  address: String,
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
});

const Property = new mongoose.model('Property', propertySchema);

// async function createProperty() {
//   const property = new Property({
//     "name": "4321 Washington Ave",
//     "slug": "4321-washington-ave",
//     "address": "4321 Washington Ave",
//     "background_image": "https://rei-portfolio.s3.us-east-2.amazonaws.com/pexels-markus-spiske-102728.jpg",
//     "platforms": [
//       {
//         "id": 3,
//         "name": "Realtor.com",
//         "slug": "realtor",
//         "url": "https://www.realtor.com"
//       }
//     ],
//     "bedrooms": 0,
//     "bathrooms": 0,
//     "days_booked": 0,
//     "propertyTypes": 7
//   });
  
//   const result = await property.save();
//   console.log(result);
// }

// async function updateProperty(id) {
//   const property = await Property.findById(id);
//   if (!property) return;
  
//   propperty.set(...property, {name: 'Test Name'})
// }

// async function getProperties() {
//   return await Property.find();
// }

// getProperties();

app.use(cors());
app.use(express.json());
app.use('/api/properties', properties);
app.use('/api/property-types', propertyTypes);

app.listen(
  PORT,
  () => console.log(`Listening on http://localhost:${PORT}`)
);
