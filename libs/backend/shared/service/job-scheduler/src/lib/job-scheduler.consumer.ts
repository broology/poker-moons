import { OnQueueFailed, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import { Job } from 'bull';
import { JOB_SCHEDULER_BULL_QUEUE } from './job-scheduler.const';

/**
 * @description Consumer that is responsible for global queue events (eg. error logging)
 */
@Injectable()
@Processor(JOB_SCHEDULER_BULL_QUEUE)
export class JobSchedulerConsumer {
    private readonly logger = new CustomLoggerService(JobSchedulerConsumer.name);

    /**
     * @description Responsible for logging errors that occur in scheduled jobs
     */
    @OnQueueFailed()
    onJobFailed(job: Job, error: Error): void {
        this.logger.error(`Job execution failed for ${job.name}:${job.id}: ${error.message}\n${error.stack}`);
    }
}
