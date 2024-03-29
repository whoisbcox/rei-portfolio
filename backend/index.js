const winston = require('winston');
const express = require('express');
const app = express();

const transportOptions = new winston.transports.Console({ format: winston.format.simple() });
const logger = winston.createLogger({ transports: transportOptions });

require('dotenv').config();
require('./startup/logging')();
require('./startup/db')(logger);
require('./startup/routes')(app);
require('./startup/config')();
require('./startup/prod');

const port = process.env.PORT || 8080;
app.listen(port, () => logger.info(`Listening on ${port}...`));
