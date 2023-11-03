const { PropertyTypes, validate } = require('../models/propertyTypes');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const propertyTypes = await PropertyTypes.find();
  res.status(200).send(propertyTypes);
});

router.get('/:id', async (req, res) => {
  const propertyType = await PropertyTypes.findById(req.params.id);
  
  if (!propertyType) return res.status(400).send('The property type with the given ID was not found');
  res.status(200).send(propertyType);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if ( error ) return res.status(400).send(error.message);

  let propertyType = new PropertyTypes({ icon: req.body.icon, name: req.body.name });

  propertyType = await propertyType.save();
  res.send(propertyType);
});

router.put('/:id', async (req, res) => {
  const propertyType = await PropertyTypes.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });

  if (!propertyType) return res.status(404).send('This property type with the given ID was not found');

  res.send(propertyType);
});

router.delete('/:id', async(req, res) => {
  const propertyType = await PropertyTypes.findByIdAndRemove(req.params.id);

  if (!propertyType) return res.status(400).send('The property type with the given ID was not found');

  res.send(propertyType);
});

module.exports = router;