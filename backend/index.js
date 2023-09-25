const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;
const properties = require('./data/properties.json');
const propertyTypes = require('./data/propertyTypes.json');
app.use(cors());
app.use(express.json());

// Properties
app.get('/api/properties', (req, res) => {
  res.status(200).send(properties);
});

app.get('/api/properties/:id', (req, res) => {
  const property = properties.results.find(p => p.id === parseInt(req.params.id));
  if (!property) return res.status(400).send('The property with the given ID was not found');
  res.status(200).send(property);
});

app.post('/api/properties', (req, res) => {
  const property = {
    id: properties.results.length + 1,
    title: req.body.title
  }

  properties.results.push(property);
  res.send(property);
});

app.delete('/api/properties/:id', (req, res) => {
  const property = properties.results.find(p => p.id === parseInt(req.params.id));
  if (!property) return res.status(400).send('The property with the given ID was not found');

  const index = properties.results.indexOf(property);
  properties.results.splice(index, 1);
  res.send(properties);
});

// Property Types
app.get('/api/property-types', (req, res) => {
  res.status(200).send(propertyTypes);
});

app.get('/api/property-types/:id', (req, res) => {
  const propertyType = propertyTypes.results.find(p => p.id === parseInt(req.params.id));
  if (!propertyType) return res.status(400).send('The property type with the given ID was not found');
  res.status(200).send(propertyType);
});

app.post('/api/property-types', (req, res) => {
  const propertyType = {
    id: propertyTypes.results.length + 1,
    title: req.body.title
  }

  propertyTypes.results.push(propertyType);
  res.send(propertyType);
});

app.delete('/api/property-types/:id', (req, res) => {
  const propertyType = propertyTypes.results.find(p => p.id === parseInt(req.params.id));
  if (!propertyType) return res.status(400).send('The property type with the given ID was not found');

  const index = propertyTypes.results.indexOf(propertyType);
  propertyTypes.results.splice(index, 1);
  res.send(propertyTypes);
});

app.listen(
  PORT,
  () => console.log(`Listening on http://localhost:${PORT}`)
);