import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { JOB_SCHEDULER_BULL_QUEUE } from '@poker-moons/backend/shared/service/job-scheduler';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import { Job } from 'bull';
import { TableStateManagerService } from '../../table-state-manager/table-state-manager.service';
import { TableGatewayService } from '../websocket/table-gateway.service';
import { TURN_TIMER_BULL_JOB } from './turn-timer.const';
import { TurnTimerQueueJobData } from './turn-timer.type';

/**
 * @description Consumer that is responsible for handling a players turn length, and times them out if they run out of time.
 */
@Injectable()
@Processor(JOB_SCHEDULER_BULL_QUEUE)
export class TurnTimerConsumer {
    private readonly logger = new CustomLoggerService(TurnTimerConsumer.name);

    constructor(
        private readonly tableGatewayService: TableGatewayService,
        private readonly tableStateManagerService: TableStateManagerService,
    ) {}

    /**
     * @description Triggered when the player has run out of time for their turn.
     *              Sets the users time bank to zero and Auto checks/folds for the player,
     *              moving the turn to the next player.
     *
     * @param job contains {@link TimeoutQueueJobData}
     */
    @Process(TURN_TIMER_BULL_JOB)
    async onComplete(job: Job<TurnTimerQueueJobData>): Promise<void> {
        const { tableId, playerId } = job.data;

        this.logger.log(`${job.id}: Player "${playerId}" timed out`);

        await this.tableStateManagerService.updateTablePlayer(tableId, playerId, { timeBank: 0 });
        this.tableGatewayService.emitTableEvent(tableId, { type: 'playerTimeBank', playerId, timeBank: 0 });

        // TODO #142 Check or Fold for player (Log which action is performed)
        // This will trigger the timer of the next player
    }
}
