import { Injectable } from '@nestjs/common';
import { JobSchedulerService } from '@poker-moons/backend/shared/service/job-scheduler';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import { TableId } from '@poker-moons/shared/type';
import { TableStateManagerService } from '../../table-state-manager/table-state-manager.service';
import { TableGatewayService } from '../websocket/table-gateway.service';
import { READY_SYSTEM_BULL_JOB } from './ready-system.const';
import { ReadyQueueJobData } from './ready-system.type';

@Injectable()
export class ReadySystemService {
    private readonly logger = new CustomLoggerService(ReadySystemService.name);

    /**
     * @description The duration that will occur between when all players ready up
     *              and the game actually starting
     */
    private static readonly waitDuration = { seconds: 10 };

    constructor(
        private readonly jobSchedulerService: JobSchedulerService,
        private readonly tableStateManager: TableStateManagerService,
        private readonly tableGatewayService: TableGatewayService,
    ) {}

    /**
     * @description Builds a deterministic id to use for the `Table`'s Ready-queue job.
     *              As, a table should only ever have one of these jobs running.
     *
     * @param tableId id of the table
     * @returns jobId of table ready queue job
     */
    private static buildJobId(tableId: string): string {
        return `${tableId}/ready-system`;
    }

    /**
     * @description When a player ready's in a table, this will check if
     *              all players are ready, if so starts the ready queue
     *
     * @param tableId id of the table a player readied on
     * @returns
     */
    async onPlayerReadied(tableId: TableId): Promise<void> {
        this.logger.debug(`${tableId}: Player ready detected`);
        return this.startOrResetQueue(tableId);
    }

    /**
     * @description When a player joins a table while it's still in `lobby`,
     *              this stop the current if it exists
     *
     * @param tableId id of the table a player joined
     */
    async onPlayerJoined(tableId: TableId): Promise<void> {
        this.logger.debug(`${tableId}: Player joined detected`);

        const table = await this.tableStateManager.getTableById(tableId);

        if (table.status !== 'lobby') {
            this.logger.debug(`${tableId}: Table status ${table.status}, thus do nothing`);
            return;
        }

        const jobId = ReadySystemService.buildJobId(tableId);

        const exists = await this.jobSchedulerService.exists(jobId);

        if (!exists) {
            this.logger.debug(`${tableId}: No active ready queue, do nothing`);
            return;
        }

        this.logger.log(`${tableId}: Player joined table during lobby, stopping queue`);

        await this.jobSchedulerService.stop(jobId);

        await this.tableStateManager.updateTable(tableId, { startDate: null });

        this.tableGatewayService.emitTableEvent(tableId, {
            type: 'tableStatusChanged',
            status: table.status,
            startDate: null,
        });
    }

    /**
     * @description When a player leaves a table while the table is still in status `lobby`
     *              then the ready queue is re-validated and reset.
     *
     * @param tableId id of the table a player left in.
     */
    onPlayerLeft(tableId: TableId): Promise<void> {
        this.logger.debug(`${tableId}: Player left detected`);
        return this.startOrResetQueue(tableId);
    }

    /**
     * @description If there are at least two players seated
     *              and all players are ready then update then start/reset the ready queue.
     *
     * @param tableId id of the table a player readied in
     */
    private async startOrResetQueue(tableId: TableId): Promise<void> {
        const canStart = await this.canStartQueue(tableId);

        if (!canStart) {
            this.logger.debug(`${tableId}: Not all players ready, thus doing nothing`);
            return;
        }
        this.logger.log(`${tableId}: All players are ready, triggering queue start`);

        const startDate = await this.jobSchedulerService.start<ReadyQueueJobData>({
            data: { tableId },
            delayInSeconds: ReadySystemService.waitDuration.seconds,
            jobId: ReadySystemService.buildJobId(tableId),
            name: READY_SYSTEM_BULL_JOB,
        });

        await this.tableStateManager.updateTable(tableId, { startDate });

        this.tableGatewayService.emitTableEvent(tableId, {
            type: 'tableStatusChanged',
            status: 'lobby',
            startDate,
        });
    }

    /**
     * @description Checks if the `ReadyQueue` can be started, requires:
     *
     * - Table must be in status `lobby`
     * - At least two players seated at the table
     * - All seated players are ready
     *
     * @param tableId id of the table to check
     *
     * @returns if the table is in a state where the ready queue can be started
     */
    private async canStartQueue(tableId: TableId): Promise<boolean> {
        const state = await this.tableStateManager.getTableById(tableId);

        if (state.status !== 'lobby') {
            this.logger.debug(`${tableId}: Table status ${state.status}, thus can not start`);
            return false;
        }

        const seatedPlayerIds = Object.values(state.seatMap).filter((id) => !!id);

        //  Confirm at least two players seated at the table
        if (seatedPlayerIds.length < 2) {
            this.logger.debug(`${tableId}: Less than 2 players, thus can not start`);
            return false;
        }

        // Confirm all seated players are ready
        for (const playerId of seatedPlayerIds) {
            if (!state.playerMap[playerId].ready) {
                this.logger.debug(`${tableId}: ${playerId} is not ready, thus can not start`);
                return false;
            }
        }

        return true;
    }
}
