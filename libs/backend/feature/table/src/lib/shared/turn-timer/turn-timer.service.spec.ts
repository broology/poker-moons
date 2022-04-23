import { JobSchedulerService } from '@poker-moons/backend/shared/service/job-scheduler';
import { mockPlayer, mockServerTableState } from '@poker-moons/shared/testing';
import { Job } from 'bull';
import { subSeconds } from 'date-fns';
import type { MockProxy } from 'jest-mock-extended';
import { mock, mockReset } from 'jest-mock-extended';
import { TableStateManagerService } from '../../table-state-manager/table-state-manager.service';
import { TableGatewayService } from '../websocket/table-gateway.service';
import { TurnTimerService } from './turn-timer.service';
import { TurnTimerQueueJobData } from './turn-timer.type';

describe('TurnTimerService', () => {
    const jobSchedulerService = mock<JobSchedulerService>();
    const tableGatewayService = mock<TableGatewayService>();
    const tableStateManagerService = mock<TableStateManagerService>();

    const params: [...MockProxy<ConstructorParameters<typeof TurnTimerService>>] = [
        jobSchedulerService,
        tableGatewayService,
        tableStateManagerService,
    ];

    const service = new TurnTimerService(...params);

    beforeEach(() => {
        for (const param of params) {
            mockReset(param);
        }
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    const tableId = `table_1`;
    const playerId = `player_1`;
    const timeoutDate = new Date();

    function mockFindTableState(args: Parameters<typeof mockServerTableState>[0] = {}) {
        tableStateManagerService.getTableById.mockResolvedValueOnce(mockServerTableState(args));
    }

    function mockStartJob(date = new Date()) {
        jobSchedulerService.start.mockResolvedValueOnce(date);
    }

    function mockStopJob(stoppedPlayerId: string, startDate = new Date()) {
        jobSchedulerService.stop.mockResolvedValueOnce({
            data: <TurnTimerQueueJobData>{
                tableId,
                playerId: stoppedPlayerId,
                startDate,
            },
        } as unknown as Job<TurnTimerQueueJobData>);
    }

    describe('onStart', () => {
        it('should start timer for given player', async () => {
            const player = mockPlayer({ timeBank: 10 });

            mockFindTableState({
                status: 'in-progress',
                playerMap: {
                    [player.id]: player,
                },
            });
            mockStartJob(timeoutDate);

            const actual = await service.onStart({ tableId, startingPlayerId: player.id });

            expect(actual).toEqual(timeoutDate);
            expect(jobSchedulerService.start).toHaveBeenCalledWith(
                expect.objectContaining({
                    delayInSeconds: 40,
                }),
            );
        });

        it('should throw error if table is not in-progress', async () => {
            mockFindTableState({ status: 'ended' });

            expect(async () => await service.onStart({ tableId, startingPlayerId: playerId })).rejects.toThrow();
        });
    });

    describe('onTurn', () => {
        it('should stop current players timer, and start the next players', async () => {
            const currentPlayer = mockPlayer({ timeBank: 10 });
            const nextPlayer = mockPlayer({ timeBank: 10 });

            mockFindTableState({
                status: 'in-progress',
                playerMap: {
                    [currentPlayer.id]: currentPlayer,
                    [nextPlayer.id]: nextPlayer,
                },
            });
            mockStartJob(timeoutDate);
            mockStopJob(currentPlayer.id);

            const actual = await service.onTurn({
                tableId,
                currentPlayerId: currentPlayer.id,
                nextPlayerId: nextPlayer.id,
            });

            expect(actual).toEqual(timeoutDate);
            expect(jobSchedulerService.start).toHaveBeenCalledWith(
                expect.objectContaining({
                    delayInSeconds: 40,
                }),
            );
            expect(jobSchedulerService.stop).toHaveBeenCalled();
        });

        it('should update time bank current player turn is after default timeout', async () => {
            const currentPlayer = mockPlayer({ timeBank: 10 });
            const nextPlayer = mockPlayer({ timeBank: 10 });

            mockFindTableState({
                status: 'in-progress',
                playerMap: {
                    [currentPlayer.id]: currentPlayer,
                    [nextPlayer.id]: nextPlayer,
                },
            });
            mockStartJob(timeoutDate);
            mockStopJob(currentPlayer.id, subSeconds(new Date(), 35));

            await service.onTurn({
                tableId,
                currentPlayerId: currentPlayer.id,
                nextPlayerId: nextPlayer.id,
            });

            expect(tableStateManagerService.updateTablePlayer).toHaveBeenCalledWith(tableId, currentPlayer.id, {
                // confirmed calculation is correct manually
                // This test has the potential of being flaky, so just doing this
                timeBank: expect.any(Number),
            });
            expect(tableGatewayService.emitTableEvent).toHaveBeenCalledWith(tableId, {
                type: 'playerTimeBank',
                playerId: currentPlayer.id,
                timeBank: expect.any(Number),
            });
        });

        it('should throw error if table is not in-progress', async () => {
            mockFindTableState({ status: 'ended' });
            mockStartJob(timeoutDate);
            mockStopJob(playerId);

            expect(
                async () => await service.onTurn({ tableId, currentPlayerId: playerId, nextPlayerId: 'player_2' }),
            ).rejects.toThrow();
        });

        it('should throw error turn timer queue returns a player id not matching the current player', async () => {
            mockFindTableState({ status: 'in-progress' });
            mockStartJob(timeoutDate);
            mockStopJob('player_notCurrent');

            expect(
                async () => await service.onTurn({ tableId, currentPlayerId: playerId, nextPlayerId: 'player_2' }),
            ).rejects.toThrow();
        });
    });
});
