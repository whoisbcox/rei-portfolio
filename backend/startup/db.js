const config = require('config');
const mongoose = require('mongoose');

module.exports = function(logger) {
  mongoose.connect(config.get('db'))
    .then(() => logger.info('Connected to MongoDB...'))
}