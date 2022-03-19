import { Process, Processor } from '@nestjs/bull';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { JOB_SCHEDULER_BULL_QUEUE } from '@poker-moons/backend/shared/service/job-scheduler';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import { Job } from 'bull';
import { READY_SYSTEM_BULL_JOB } from './ready-system.const';

/**
 * @description Consumer that is responsible for handling when a ready queue job executes.
 *              Starting the game.
 */
@Injectable()
@Processor(JOB_SCHEDULER_BULL_QUEUE)
export class ReadySystemConsumer {
    private readonly logger = new CustomLoggerService(ReadySystemConsumer.name);

    @Process(READY_SYSTEM_BULL_JOB)
    async onComplete(job: Job): Promise<void> {
        this.logger.debug(`${job.id}: Table ready, starting game...`);

        // Implement table starting
        throw new NotImplementedException();

        this.logger.log(`${job.id}: Table started`);
    }
}
