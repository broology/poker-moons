import { Module } from '@nestjs/common';
import { BackendFeatureTableModule } from '@poker-moons/backend/feature/table';
import { JobSchedulerModule } from '@poker-moons/backend/shared/service/job-scheduler';
import { AppController } from './app.controller';

@Module({
    imports: [
        // Feature Modules
        BackendFeatureTableModule,

        // Shared Services
        JobSchedulerModule.forRoot({
            useFactory: () => ({
                redis: {
                    host: 'localhost',
                    port: 6379,
                },
                limiter: {
                    duration: 1000,
                    max: 100,
                },
                prefix: 'job-scheduler',
            }),
        }),
    ],
    controllers: [AppController],
})
export class AppModule {}
