const Joi = require('joi');
const mongoose = require('mongoose');

const FormSubmissions = mongoose.model('FormSubmissions', new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Properties'
  },
  start_date: Date,
  end_date: Date,
  name: String,
  email: String
}));

function validateFormSubmission(submission) {
  const schema = Joi.object({
    property: Joi.string().required(),
    start_date: Joi.date().required(),
    end_date: Joi.date(),
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).email().required()
  });

  return schema.validate(submission);
}

exports.FormSubmissions = FormSubmissions;
exports.validate = validateFormSubmission;