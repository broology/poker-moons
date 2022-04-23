import { ConsoleLogger } from '@nestjs/common';
import * as winston from 'winston';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const timestamp = winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' });
const printf = winston.format.printf(
    (info) => `[${info.timestamp}] [${info.level}] [${info.className}] [${info.message}]`,
);
const formatC: winston.Logform.Format = winston.format.combine(
    timestamp,
    winston.format.colorize({ all: true }),
    printf,
);
const format: winston.Logform.Format = winston.format.combine(timestamp, printf);

const transports = [
    new winston.transports.Console({
        format: formatC,
        level: process.env.LOG_LEVEL,
    }),
];

export class CustomLoggerService extends ConsoleLogger {
    private className: string;

    private winstonLogger = winston.createLogger({
        levels,
        format,
        transports,
    });

    constructor();
    constructor(context: string);
    constructor(context?: string) {
        super();
        if (context) {
            this.className = context;
        } else {
            this.className = 'Backend';
        }
    }

    debug(message: string): void {
        this.winstonLogger.debug({ className: this.className, message: message });
    }

    error(message: string): void {
        this.winstonLogger.error({ className: this.className, message: message });
    }

    log(message: string): void {
        this.winstonLogger.info({ className: this.className, message: message });
    }

    warn(message: string): void {
        this.winstonLogger.warn({ className: this.className, message: message });
    }
}
