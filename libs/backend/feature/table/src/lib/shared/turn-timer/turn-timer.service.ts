import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JobSchedulerService } from '@poker-moons/backend/shared/service/job-scheduler';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import { Player, TableId } from '@poker-moons/shared/type';
import { differenceInSeconds } from 'date-fns';
import { TableStateManagerService } from '../../table-state-manager/table-state-manager.service';
import { TableGatewayService } from '../websocket/table-gateway.service';
import { TURN_TIMER_BULL_JOB } from './turn-timer.const';
import { OnEndArgs, OnStartArgs, OnTurnArgs, TurnTimerQueueJobData } from './turn-timer.type';

@Injectable()
export class TurnTimerService {
    /**
     * @description The allotted amount of time users are allowed for their turn, without running into
     *              their `timeBank`.
     */
    private static readonly timeout = { seconds: 30 };

    private readonly logger = new CustomLoggerService(TurnTimerService.name);

    constructor(
        private readonly jobSchedulerService: JobSchedulerService,
        private readonly tableGatewayService: TableGatewayService,
        private readonly tableStateManagerService: TableStateManagerService,
    ) {}

    /**
     * @description Builds a deterministic id to use for the `Table`'s turn-timer job.
     *              As, a table should only ever have one of these jobs running.
     *              as their can only be one active player.
     *
     * @param tableId id of the table
     * @returns jobId of table ready queue job
     */
    private static buildJobId(tableId: string): string {
        return `${tableId}/turn-timer`;
    }

    /**
     * @description Given the amount of `secondsElapsed` in the turn. Calculate if any,
     *              how much seconds are to be taken of the `timeBank`.
     *
     * @param secondsElapsed amount of seconds turn took
     * @returns amount of seconds to take of `timeBank` if any
     */
    private static calculateTimeBankDelta(secondsElapsed: number): number {
        const delta = secondsElapsed - TurnTimerService.timeout.seconds;

        return Math.max(0, delta);
    }

    /**
     * @description Starts the turn timer job for the first player active player in the game.
     *              Called when a game is first started.
     *
     * @param args id of table and active player
     *
     * @returns { Date } the active player will timeout
     *
     * @throws {InternalServerErrorException} if table status is not `in-progress`
     */
    async onStart(args: OnStartArgs): Promise<Date> {
        const { startingPlayerId, tableId } = args;

        const state = await this.tableStateManagerService.getTableById(tableId);

        if (state.status !== 'in-progress') {
            throw new InternalServerErrorException(`Can not trigger onStart event when table is not in-progress`);
        }

        this.logger.debug(`${tableId}: A new round is starting. Timer will be started for ${startingPlayerId}.`);

        return this.startTimerForPlayer(tableId, state.playerMap[startingPlayerId]);
    }

    /**
     * @description Called after a player performs an action, ending the current players turn timer,
     *              And starting the next players. If the current player ran past their default timeout
     *              period, then it will be subtracted from their `timeBank`.
     *
     * @param args id of table, id of current player, and id of next player
     *
     * @returns {Date} date the next player will timeout
     *
     * @throws {InternalServerErrorException} if table status is not `in-progress`
     */
    async onTurn(args: OnTurnArgs): Promise<Date> {
        const { currentPlayerId, nextPlayerId, tableId } = args;

        this.logger.debug(`${tableId}: Turn has been detected for ${currentPlayerId}, next up ${nextPlayerId}`);

        const state = await this.tableStateManagerService.getTableById(tableId);

        if (state.status !== 'in-progress') {
            throw new InternalServerErrorException(`Can not trigger onTurn event when table is not in-progress`);
        }

        await this.stopTimerForPlayer(tableId, state.playerMap[currentPlayerId]);

        return this.startTimerForPlayer(tableId, state.playerMap[nextPlayerId]);
    }

    /**
     * @description Called after a player performs the final action of a round.
     *              If the player ran past their default timeout period, then
     *              it will be subtracted from their `timeBank`.
     *
     * @param args id of the table and id of the final player to take their turn
     *
     * @throws {InternalServerErrorException} if table status is not `in-progress`
     */
    async onEnd(args: OnEndArgs): Promise<void> {
        const { tableId, finalPlayerId } = args;

        const state = await this.tableStateManagerService.getTableById(tableId);

        if (state.status !== 'in-progress') {
            throw new InternalServerErrorException(`Can not trigger onEnd event when table is not in-progress`);
        }

        this.logger.debug(`${tableId}: Final turn of round is ending. Timer will be stopped for ${finalPlayerId}.`);

        await this.stopTimerForPlayer(tableId, state.playerMap[finalPlayerId]);
    }

    /**
     * @description Create a job setting it to execute when the player would max out their time.
     *
     * @param tableId id of the table
     * @param player the player who's timer is being started
     */
    private async startTimerForPlayer(tableId: TableId, player: Pick<Player, 'id' | 'timeBank'>): Promise<Date> {
        this.logger.debug(`${tableId}: Turn timer starting for ${player.id}`);

        const jobEndDate = await this.jobSchedulerService.start<TurnTimerQueueJobData>({
            data: { playerId: player.id, startDate: new Date(), tableId },
            delayInSeconds: player.timeBank + TurnTimerService.timeout.seconds,
            name: TURN_TIMER_BULL_JOB,
            jobId: TurnTimerService.buildJobId(tableId),
        });

        this.logger.log(`${tableId}: Turn timer started for ${player.id}`);

        return jobEndDate;
    }

    /**
     * @description Finds the existing turn timer job on the table and stops it, updating the players `timeBank`
     *              if they exceeded the {@link timeout}.
     *
     * @param tableId id of the table
     * @param player the player who's timer is being stopped
     *
     * @throws { InternalServerErrorException } if player found in turn timer queue is different than the player
     *                                          whose timer is being stopped
     */
    private async stopTimerForPlayer(tableId: TableId, player: Pick<Player, 'id' | 'timeBank'>): Promise<void> {
        this.logger.debug(`${tableId}: Turn timer stopping for ${player.id}`);

        const jobId = TurnTimerService.buildJobId(tableId);

        const job = await this.jobSchedulerService.stop<TurnTimerQueueJobData>(jobId);

        /**
         * If job does not exist, that means the `turn-timer.consumer` has already processes the current user.
         */
        if (job) {
            if (job.data.playerId !== player.id) {
                throw new InternalServerErrorException(
                    `Turn timer out of sync, expect player in queue: ${player.id}. found: ${job.data.playerId}`,
                );
            }

            const secondsElapsed = differenceInSeconds(new Date(), new Date(job.data.startDate));

            const timeBankDelta = TurnTimerService.calculateTimeBankDelta(secondsElapsed);

            if (timeBankDelta > 0) {
                const newTimeBank = player.timeBank - timeBankDelta;

                await this.tableStateManagerService.updateTablePlayer(tableId, player.id, {
                    timeBank: newTimeBank,
                });
                this.tableGatewayService.emitTableEvent(tableId, {
                    type: 'playerTimeBank',
                    playerId: player.id,
                    timeBank: newTimeBank,
                });

                this.logger.log(
                    `${tableId}: Player "${player.id} exceeded default timeout, took ${timeBankDelta} seconds off time bank"`,
                );
            } else {
                this.logger.log(`${tableId}: Player "${player.id} timer stopped before timeout"`);
            }
        } else {
            this.logger.log(`${tableId}: Job not found, turn timer must of timed out for "${player.id}"`);
        }
    }
}
