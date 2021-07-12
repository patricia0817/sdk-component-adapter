import {createLogger, format, transports} from 'winston';

const options = {
  format: format.combine(
    format.colorize(),
    format.simple(),
  ),
  silent: process.env.NODE_ENV === 'production',
};

const consoleTransport = new transports.Console(options);
let fileTransport;

const transportOptions = [consoleTransport];

if (typeof window === 'undefined') {
  fileTransport = new transports.File({
    filename: 'logger.log',
  });
  transportOptions.push(fileTransport);
}

const logger = createLogger({
  transports: transportOptions,
});

export default logger;
