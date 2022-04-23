import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { JOB_SCHEDULER_BULL_QUEUE } from './job-scheduler.const';
import { JobSchedulerConsumer } from './job-scheduler.consumer';
import { JobSchedulerService } from './job-scheduler.service';

@Module({
    imports: [BullModule.registerQueue({ name: JOB_SCHEDULER_BULL_QUEUE })],
    providers: [JobSchedulerService, JobSchedulerConsumer],
    exports: [JobSchedulerService],
})
export class JobSchedulerModule {}
