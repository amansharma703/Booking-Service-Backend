/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import winston from 'winston';
import { MongoDB } from "winston-mongodb";
require("winston-mongodb").MongoDB;


const enumerateErrorFormat = winston.format((info) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        enumerateErrorFormat(),
        winston.format.colorize(),
        winston.format.json(),
        winston.format.printf(({ level, message }) => `${level}: ${message}`),
        winston.format.metadata(),
    ),
    transports: [
        new winston.transports.Console({
            stderrLevels: ['error'],
            handleExceptions: true
        }),
    ],
});


export default logger;
