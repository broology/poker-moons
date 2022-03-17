import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import { TableId } from '@poker-moons/shared/type';
import { Queue } from 'bull';
import { READY_BULL_QUEUE } from './ready-queue.const';

/**
 * @description Service that is responsible for taking the requests to start and stop
 *              the ready queue for a given `Table`
 */
@Injectable()
export class ReadyQueueService {
    private logger = new CustomLoggerService(ReadyQueueService.name);

    /**
     * @description The number of milliseconds that will occur between, when all players ready up,
     *              and the game actually starting
     */
    private static readonly millisecondsBeforeStart = 3000;

    constructor(@InjectQueue(READY_BULL_QUEUE) private readonly queue: Queue) {}

    /**
     * @description Builds a deterministic id to use for the `Table`'s Ready-queue job.
     *              As, a table should only ever have one of these jobs running.
     *
     * @param tableId id of the table
     * @returns jobId of table ready queue job
     */
    private static getJobId(tableId: TableId): string {
        return `${tableId}/${READY_BULL_QUEUE}`;
    }

    /**
     * @description Starts the ready queue for the given table. Should only be called
     *              when all players have been readied up.
     *
     * @param tableId id of the table
     */
    async start(tableId: TableId): Promise<void> {
        const jobId = ReadyQueueService.getJobId(tableId);
        this.logger.debug(`${jobId}: Starting job`);

        const existingJob = await this.queue.getJob(jobId);
        if (existingJob) {
            this.logger.warn(`${jobId}: Starting job when this job already exists. Resetting...`);
            return this.reset(tableId);
        }

        await this.queue.add(jobId, { delay: ReadyQueueService.millisecondsBeforeStart }, { jobId });
        this.logger.log(`${jobId}: Started job`);
    }

    /**
     * @description Stops the ready queue for the give table. Should be called when
     *              all players were ready, and another player joins the game or a player goes unready.
     *
     * @param tableId id of the table
     */
    async stop(tableId: TableId): Promise<void> {
        const jobId = ReadyQueueService.getJobId(tableId);
        this.logger.debug(`${jobId}: Stopping job`);

        const existingJob = await this.queue.getJob(jobId);

        if (!existingJob) {
            this.logger.warn(`${jobId}: Stopping job when this job does not exists`);
            return;
        }

        await existingJob.discard();
        this.logger.log(`${jobId}: Stopped job`);
    }

    /**
     * @description Resets the ready queue for the table in the event where
     *
     * @param tableId id of the table
     */
    private async reset(tableId: TableId): Promise<void> {
        const jobId = ReadyQueueService.getJobId(tableId);
        this.logger.debug(`${jobId}: Resetting job`);

        await this.stop(tableId);
        await this.start(tableId);

        this.logger.log(`${jobId}: Reset job`);
    }
}
