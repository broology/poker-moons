import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { JOB_SCHEDULER_BULL_QUEUE } from '@poker-moons/backend/shared/service/job-scheduler';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import { PlayerId, TableId } from '@poker-moons/shared/type';
import { Job } from 'bull';
import { PlayerActionService } from '../../../player-action/player-action.service';
import { TableStateManagerService } from '../../../table-state-manager/table-state-manager.service';
import { TableGatewayService } from '../../websocket/table-gateway.service';
import { TURN_TIMER_BULL_JOB } from '../turn-timer.const';
import { TurnTimerQueueJobData } from '../turn-timer.type';

/**
 * @description Consumer that is responsible for handling a players turn length, and times them out if they run out of time.
 */
@Injectable()
@Processor(JOB_SCHEDULER_BULL_QUEUE)
export class TurnTimerServiceConsumer {
    private readonly logger = new CustomLoggerService(TurnTimerServiceConsumer.name);

    constructor(
        private readonly playerActionService: PlayerActionService,
        private readonly tableGatewayService: TableGatewayService,
        private readonly tableStateManagerService: TableStateManagerService,
    ) {}

    /**
     * @description Triggered when the player has run out of time for their turn. Sets the users time bank to zero
     * and Auto checks/folds for the player, moving the turn to the next player.
     *
     * @param job Contains {@link TimeoutQueueJobData}
     */
    @Process(TURN_TIMER_BULL_JOB)
    async onComplete(job: Job<TurnTimerQueueJobData>): Promise<void> {
        const { tableId, playerId } = job.data;

        this.logger.log(`${job.id}: Player "${playerId}" timed out`);

        await this.tableStateManagerService.updateTablePlayer(tableId, playerId, { timeBank: 0 });
        this.tableGatewayService.emitTableEvent(tableId, { type: 'playerChanged', id: playerId, timeBank: 0 });

        // Check or Fold for player
        await this.triggerAction(tableId, playerId);
    }

    /**
     * @description Determines whether the player should automatically check or fold and calls the appropriate
     * action handler.
     *
     * @param tableId
     * @param playerId
     */
    private async triggerAction(tableId: TableId, playerId: PlayerId): Promise<void> {
        const table = await this.tableStateManagerService.getTableById(tableId);

        if (table.activeRound.toCall > 0) {
            this.logger.log(`Auto-folding for ${playerId}`);
            await this.playerActionService.perform(tableId, playerId, { action: { type: 'fold' } });
        } else {
            this.logger.log(`Auto-checking for ${playerId}`);
            await this.playerActionService.perform(tableId, playerId, { action: { type: 'check' } });
        }
    }
}
