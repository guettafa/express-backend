import winston from "winston";

const LOG_FOLDER = "./src/v1/logs/";
const ALERT_LOG_FILE  = LOG_FOLDER  + "alerts.log";
const ERROR_LOG_FILE  = LOG_FOLDER  + "errors.log";

const {combine, timestamp, json} = winston.format;

export const logger = winston.createLogger({
    level: 'info',
    format: combine(timestamp(), json()),
    transports: [
        new winston.transports.File({
            filename: ALERT_LOG_FILE,
        }),
        new winston.transports.File({
            filename: ERROR_LOG_FILE,
            level: 'error'
        }),
    ],
});

/*  WINSTON LOG LEVELS
{
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
} 
*/