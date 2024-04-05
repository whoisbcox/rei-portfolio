const mongoose = require('mongoose');

module.exports = function(logger) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => logger.info('Connected to MongoDB...'))
}