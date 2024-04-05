const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

module.exports = async function() {
  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple(),
          winston.format.prettyPrint()
        )
      }),
      new winston.transports.File({ level: 'error', filename: 'logfile.log', handleExceptions: true, handleRejections: true, exitOnError: true }),
    ],
  });
  
  const url = process.env.MONGODB_URI;
  const client = new MongoClient(url);
  await client.connect();

  logger.add(new winston.transports.MongoDB({ db: await Promise.resolve(client), collection: 'log' }));
}