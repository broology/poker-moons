import { OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import { Job } from 'bull';
import { READY_BULL_QUEUE } from './ready-queue.const';

/**
 * @description Consumer that is responsible for handling when a ready queue job executes.
 *              Starting the game.
 */
@Injectable()
@Processor(READY_BULL_QUEUE)
export class ReadyQueueConsumer {
    private readonly logger = new CustomLoggerService(ReadyQueueConsumer.name);

    // constructor(private readonly tableStateService: ){}

    @Process()
    onComplete(job: Job) {
        this.logger.debug(`${job.id}: Table ready, starting game...`);

        // Implement table starting
        throw new NotImplementedException();

        this.logger.log(`${job.id}: Table started`);
    }

    /**
     * Triggers when a `Job` in the queue fails
     *
     */
    @OnQueueFailed()
    onJobFailed(job: Job, error: Error): void {
        this.logger.error(`${job.id}: Failed start game, ${error.message} ${error.stack}`);
    }
}
