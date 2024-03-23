const winston = require('winston');

module.exports = function(err, req, res, next) {
  const logger = winston.createLogger({
    transports: [
      new winston.transports.File({ filename: 'logfile.log' })
    ]
  });
  logger.error(err.message, err);

  res.status(500).send('Something failed.');
}