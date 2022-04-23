import { BullModuleOptions, SharedBullConfigurationFactory } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BullConfigService implements SharedBullConfigurationFactory {
    constructor(private readonly configService: ConfigService) {}

    createSharedConfiguration(): BullModuleOptions {
        return {
            defaultJobOptions: {
                attempts: 1,
                removeOnComplete: true,
                removeOnFail: true,
            },
            limiter: {
                /**
                 * Maximum of 100 jobs every 1 second by default
                 */
                duration: 1000,
                max: 100,
                bounceBack: false,
            },
            prefix: 'job-scheduler',
            redis: {
                host: this.configService.get('REDIS_HOST', 'localhost'),
                port: parseInt(this.configService.get('REDIS_PORT', '6379'), 10),
            },
        };
    }
}
