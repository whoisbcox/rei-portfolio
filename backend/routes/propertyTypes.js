const express = require('express');
const router = express.Router();

const propertyTypes = require('../data/propertyTypes.json');

router.get('/', (req, res) => {
  res.status(200).send(propertyTypes);
});

router.get('/:id', (req, res) => {
  const propertyType = propertyTypes.results.find(p => p.id === parseInt(req.params.id));
  if (!propertyType) return res.status(400).send('The property type with the given ID was not found');
  res.status(200).send(propertyType);
});

router.post('/', (req, res) => {
  const propertyType = {
    id: propertyTypes.results.length + 1,
    name: req.body.name
  }

  propertyTypes.results.push(propertyType);
  res.send(propertyType);
});

router.delete('/:id', (req, res) => {
  const propertyType = propertyTypes.results.find(p => p.id === parseInt(req.params.id));
  if (!propertyType) return res.status(400).send('The property type with the given ID was not found');

  const index = propertyTypes.results.indexOf(propertyType);
  propertyTypes.results.splice(index, 1);
  res.send(propertyTypes);
});

module.exports = router;