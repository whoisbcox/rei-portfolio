require('express-async-errors');
const error = require('./middleware/error');
const dotenv = require('dotenv');
dotenv.config();
const config = require('config');
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8080;
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const s3Middleware = require('./middleware/s3Middleware');
const users = require('./routes/users');
const properties = require('./routes/properties');
const propertyTypes = require('./routes/propertyTypes');
const formSubmissions = require('./routes/formSubmissions');


if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}

mongoose.connect('mongodb://127.0.0.1:27017/reiportfolio')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use(cors());
app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/properties', s3Middleware);
app.use('/api/properties', properties);
app.use('/api/property-types', propertyTypes);
app.use('/api/submit-form', formSubmissions);
app.use(error);

app.listen(
  PORT,
  () => console.log(`Listening on http://localhost:${PORT}`)
);
