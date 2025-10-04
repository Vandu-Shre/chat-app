import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'debug', // 👈 master level threshold — captures all logs from here down
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }), // include error stacks
    format.colorize(),
    format.printf(({ timestamp, level, message, stack }) => {
      return stack
        ? `[${timestamp}] ${level}: ${message}\n${stack}`
        : `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new transports.Console({ level: 'debug' }), // ⬅️ dev output: debug and up

    // File for errors only
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),

    // File for all logs (info and up)
    new transports.File({
      filename: 'logs/combined.log',
      level: 'info',
    }),
  ],
});

export default logger;
