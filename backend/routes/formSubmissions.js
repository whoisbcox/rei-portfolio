const auth = require('../middleware/auth');
const { FormSubmissions, validate } = require('../models/formSubmissions');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  // const query = req.query.user ? {'properties.user': req.query.user} : undefined;
  const userId = req.query.user ? req.query.user: undefined;
  const submissions = await FormSubmissions.find().populate({
      path: 'property',
      match: { user: userId },
      populate: { path: 'propertyTypes', model: 'PropertyTypes' }
    }).sort({ start_date: -1 });
  const filteredSubmissions = submissions.filter(submission => submission.property !== null);
  res.status(200).send(filteredSubmissions);
});

router.get('/:id', auth, async (req, res) => {
  const formSubmission = await FormSubmissions.findById(req.params.id);
  
  if (!formSubmission) return res.status(400).send('The form submission with the given ID was not found');
  res.status(200).send(formSubmission);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if ( error ) return res.status(400).send(error.message);

  let formSubmission = new FormSubmissions({ ...req.body });

  formSubmission = await formSubmission.save();
  res.send(formSubmission);
});

router.delete('/:id', auth, async(req, res) => {
  const formSubmission = await FormSubmissions.findByIdAndRemove(req.params.id);

  if (!formSubmission) return res.status(400).send('The form submission with the given ID was not found');

  res.send(formSubmission);
});

module.exports = router;