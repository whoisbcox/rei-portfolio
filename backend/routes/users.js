const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
});

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.put('/me', auth, async (req, res) => {
  const { password, ...otherFields } = req.body;
  const updateObject = _.pickBy(otherFields, field => !_.isEmpty(field));
  
  if (password) {
    const salt = await bcrypt.genSalt(10);
    updateObject.password = await bcrypt.hash(password, salt);
  }
  
  const user = await User.findByIdAndUpdate(req.user._id, {...updateObject}, {new: true});
  const token = await user.generateAuthToken();
  
  res.send(token);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if ( error ) return res.status(400).send(error.message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  const count = await User.countDocuments();
  console.log(count);

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  if (count === 0) user.role = 'admin';

  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  
  if (!user) return res.status(404).send('The user with the given ID could not be found.');
  
  res.send(user);
});

module.exports = router;