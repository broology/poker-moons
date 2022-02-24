import { LoggerService } from '@nestjs/common';

export class CustomLoggerService implements LoggerService {
    debug(message: any, ...optionalParams: any[]): any {}

    error(message: any, ...optionalParams: any[]): any {}

    log(message: any, ...optionalParams: any[]): any {}

    warn(message: any, ...optionalParams: any[]): any {}
}
