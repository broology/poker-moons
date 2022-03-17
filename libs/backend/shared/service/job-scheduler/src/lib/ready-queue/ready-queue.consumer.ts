import { OnQueueActive, Processor } from '@nestjs/bull';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { Job } from 'bull';
import { READY_BULL_QUEUE } from './ready-queue.const';

/**
 * @description Consumer that is responsible for handling when a ready queue job executes.
 *              Starting the game.
 */
@Injectable()
@Processor(READY_BULL_QUEUE)
export class ReadyQueueConsumer {
    @OnQueueActive()
    onActive(job: Job) {
        throw new NotImplementedException();
    }
}
