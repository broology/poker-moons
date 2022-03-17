import { BullModule } from '@nestjs/bull';
import { DynamicModule, Module } from '@nestjs/common';
import { ReadyQueueModule } from './ready-queue/ready-queue.module';

/**
 * @description Configuration object to initialize the bull service inside of
 *              the Job scheduler
 */
export interface JobSchedulerConfig {
    /**
     * Redis connection information
     */
    redis: {
        host: string;
        port: number;
    };

    /**
     * `max` jobs that can be executed every `duration` milliseconds
     */
    limiter: {
        max: number;
        duration: number;
    };

    /**
     * `prefix` for all redis queue keys
     */
    prefix: string;
}

@Module({
    imports: [ReadyQueueModule],
})
export class JobSchedulerModule {
    /**
     * @description Initializes the `Bull` configuration in the root of the app
     */
    static forRoot(config: JobSchedulerConfig): DynamicModule {
        return {
            module: JobSchedulerModule,
            imports: [
                BullModule.forRoot({
                    redis: config.redis,
                    limiter: {
                        duration: config.limiter.duration,
                        max: config.limiter.max,
                        bounceBack: false,
                    },
                    prefix: config.prefix,
                }),
            ],
        };
    }
}
