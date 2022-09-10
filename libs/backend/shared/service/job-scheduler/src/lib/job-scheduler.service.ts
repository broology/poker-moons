import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import { Job, Queue } from 'bull';
import { addSeconds } from 'date-fns';
import { JOB_SCHEDULER_BULL_QUEUE } from './job-scheduler.const';
import { ScheduleJobArgs } from './job-scheduler.type';

/**
 * @description Service that is responsible for taking the requests to schedule and remove the jobs.
 */
@Injectable()
export class JobSchedulerService {
    private logger = new CustomLoggerService(JobSchedulerService.name);

    constructor(@InjectQueue(JOB_SCHEDULER_BULL_QUEUE) private readonly queue: Queue) {}

    /**
     * @description Returns the job if it exists.
     *
     * @param jobId Id of job to find.
     *
     * @returns Job found, or null.
     */
    get<T>(jobId: string): Promise<Job<T> | null> {
        return this.queue.getJob(jobId);
    }

    /**
     * @description Schedules a job that will be executed in `delayInSeconds`.
     *
     * @param args
     *
     * @returns Date of when the job will execute.
     */
    async schedule<T>(args: ScheduleJobArgs<T>): Promise<Date> {
        const { data, delayInSeconds, name, jobId } = args;

        this.logger.debug(`${jobId}: Scheduling job...`);

        const existingJob = await this.queue.getJob(jobId);

        if (existingJob) {
            this.logger.log(
                `${jobId}: Scheduling job that already exists. Removing current job, and starting new one...`,
            );

            await this.remove(jobId);
        }

        const dateOfJob = addSeconds(new Date(), delayInSeconds);
        await this.queue.add(name, data, { jobId, delay: delayInSeconds * 1000 });

        this.logger.log(`${jobId}: Scheduled job to execute at ${dateOfJob}`);

        return dateOfJob;
    }

    /**
     * @description Finds the active job with the given `jobId` and removes it.
     *
     * @param jobId Id of the job being stopped.
     *
     * @returns The removed job if found, null if not found.
     */
    async remove<T>(jobId: string): Promise<Job<T> | null> {
        this.logger.debug(`${jobId}: Removing job`);

        const job = await this.queue.getJob(jobId);

        if (!job) {
            this.logger.warn(`${jobId}: Removing job when this job does not exists`);
            return null;
        }

        await this.queue.removeJobs(jobId);
        this.logger.log(`${jobId}: Removed job`);
        return job;
    }
}
