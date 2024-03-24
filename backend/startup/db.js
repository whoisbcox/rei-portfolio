const mongoose = require('mongoose');

module.exports = function(logger) {
  mongoose.connect('mongodb://127.0.0.1:27017/reiportfolio')
    .then(() => logger.info('Connected to MongoDB...'))
}