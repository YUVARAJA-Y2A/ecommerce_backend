const path = require('path');
const winston = require('winston');

//winston logger Initialization
const level = 'info';
const logger = winston.createLogger({
  level: level,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.prettyPrint(true),
    winston.format.printf(info => (info.data) ? `${info.timestamp} ${info.level}: ${info.message}: ${JSON.stringify(info.data)}` : `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console({ level: level, colorize: true })
  ]
});

module.exports = logger;