const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize } = format;

const isVercel = process.env.VERCEL === "1";

const customFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}] ${stack || message}`;
});

const loggerTransports = [
  new transports.Console({
    format: combine(colorize(), timestamp(), customFormat),
  }),
];

if (!isVercel) {
  loggerTransports.push(
    new transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new transports.File({
      filename: "logs/combined.log",
    })
  );
}

const logger = createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    customFormat
  ),
  transports: loggerTransports,
});

module.exports = logger;
