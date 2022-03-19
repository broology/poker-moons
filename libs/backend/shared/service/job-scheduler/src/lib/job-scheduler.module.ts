import { BullModule } from '@nestjs/bull';
import { DynamicModule, FactoryProvider, Global, Module, Provider } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ReadyQueueModule } from './ready-queue';

/**
 * @description Configuration object to initialize the bull service inside of
 *              the Job scheduler
 */
interface JobSchedulerConfig {
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

export type JobSchedulerConfigFactory = Omit<FactoryProvider<JobSchedulerConfig>, 'provide'>;
export const JOB_SCHEDULER_CONFIG = Symbol('job_scheduler_config');

@Global()
@Module({})
export class JobSchedulerConfigModule {
    static forRoot(config: JobSchedulerConfigFactory): DynamicModule {
        const providers: Provider[] = [];

        providers.push({
            provide: JOB_SCHEDULER_CONFIG,
            ...config,
        });

        return {
            module: JobSchedulerConfigModule,
            providers: providers,
            exports: [JOB_SCHEDULER_CONFIG],
            global: true,
        };
    }
}

@Module({
    imports: [
        ReadyQueueModule,

        // TO BE DELETED
        RouterModule.register([
            {
                path: '/ready-queue/:tableId',
                module: ReadyQueueModule,
            },
        ]),
    ],
})
export class JobSchedulerModule {
    /**
     * @description Initializes the `Bull` configuration in the root of the app
     */
    static forRoot(config: JobSchedulerConfigFactory): DynamicModule {
        const providers: Provider[] = [];

        return {
            module: JobSchedulerModule,
            imports: [
                JobSchedulerConfigModule.forRoot(config),

                BullModule.forRootAsync({
                    useFactory: (config: JobSchedulerConfig) => ({
                        defaultJobOptions: {
                            attempts: 1,
                            removeOnComplete: true,
                        },
                        limiter: {
                            duration: config.limiter.duration,
                            max: config.limiter.max,
                            bounceBack: false,
                        },
                        prefix: config.prefix,
                        redis: config.redis,
                    }),
                    inject: [JOB_SCHEDULER_CONFIG],
                }),
            ],
            providers,
        };
    }
}
