import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import { Job, Queue } from 'bull';
import { addSeconds } from 'date-fns';
import { JOB_SCHEDULER_BULL_QUEUE } from './job-scheduler.const';
import { StartScheduledJobArgs } from './job-scheduler.type';

/**
 * @description Service that is responsible for taking the requests to start and stop
 *              the jobs.
 */
@Injectable()
export class JobSchedulerService {
    private logger = new CustomLoggerService(JobSchedulerService.name);

    constructor(@InjectQueue(JOB_SCHEDULER_BULL_QUEUE) private readonly queue: Queue) {}

    /**
     * @description Returns the job if it exists
     *
     * @param jobId id of job to find
     * @returns job found, or null
     */
    get<T>(jobId: string): Promise<Job<T> | null> {
        return this.queue.getJob(jobId);
    }

    /**
     * @description Creates a job that will be executed in `delayInSeconds`.
     *
     * @param args
     *
     * @returns date of when the job will execute
     */
    async start<T>(args: StartScheduledJobArgs<T>): Promise<Date> {
        const { data, delayInSeconds, name, jobId } = args;

        this.logger.debug(`${jobId}: Starting job`);

        const existingJob = await this.queue.getJob(jobId);

        if (existingJob) {
            this.logger.log(`${jobId}: Starting job when this job already exists. Stopping current job...`);

            await this.stop(jobId);
        }

        const dateOfJob = addSeconds(new Date(), delayInSeconds);
        await this.queue.add(name, data, { jobId, delay: delayInSeconds * 1000 });

        this.logger.log(`${jobId}: Started job to execute at ${dateOfJob}`);

        return dateOfJob;
    }

    /**
     * @description Finds the active job with the given `jobId` and stops stops/removes it
     *
     * @param jobId id of the job being stopped
     * @returns the removed job if found
     */
    async stop<T>(jobId: string): Promise<Job<T> | null> {
        this.logger.debug(`${jobId}: Stopping job`);

        const job = await this.queue.getJob(jobId);

        if (!job) {
            this.logger.warn(`${jobId}: Stopping job when this job does not exists`);
            return null;
        }

        await this.queue.removeJobs(jobId);
        this.logger.log(`${jobId}: Stopped job`);
        return job;
    }
}
