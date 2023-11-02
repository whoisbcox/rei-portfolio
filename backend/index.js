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

app.use(cors());
app.use(express.json());
app.use('/api/properties', properties);
app.use('/api/property-types', propertyTypes);

app.listen(
  PORT,
  () => console.log(`Listening on http://localhost:${PORT}`)
);
