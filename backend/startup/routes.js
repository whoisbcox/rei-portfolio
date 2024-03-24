const express = require('express');
const cors = require('cors');
const error = require('../middleware/error');
const auth = require('../routes/auth');
const s3Middleware = require('../middleware/s3Middleware');
const users = require('../routes/users');
const properties = require('../routes/properties');
const propertyTypes = require('../routes/propertyTypes');
const formSubmissions = require('../routes/formSubmissions');

module.exports = function(app) {
  app.use(cors());
  app.use(express.json());
  app.use('/api/auth', auth);
  app.use('/api/users', users);
  app.use('/api/properties', s3Middleware);
  app.use('/api/properties', properties);
  app.use('/api/property-types', propertyTypes);
  app.use('/api/submit-form', formSubmissions);
  app.use(error);
}