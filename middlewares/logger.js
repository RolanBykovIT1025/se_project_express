const winston = require("winston");
const expressWinston = require("express-winston");

const { combine, timestamp, json } = winston.format;

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: "request.log",
      level: "info",
    }),
  ],
  format: combine(timestamp(), json()),
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false,
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: "error.log",
      level: "error",
    }),
  ],
  format: combine(timestamp(), json()),
});

module.exports = {
  requestLogger,
  errorLogger,
};
