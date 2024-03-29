import { JobSchedulerService } from '@poker-moons/backend/shared/service/job-scheduler';
import { mockPlayer, mockServerTableState } from '@poker-moons/shared/testing';
import { Job } from 'bull';
import type { MockProxy } from 'jest-mock-extended';
import { mock, mockReset } from 'jest-mock-extended';
import { TableStateManagerService } from '../../table-state-manager/table-state-manager.service';
import { TableGatewayService } from '../websocket/table-gateway.service';
import { ReadySystemService } from './ready-system.service';
import { ReadyQueueJobData } from './ready-system.type';

describe('ReadySystemService', () => {
    const jobSchedulerService = mock<JobSchedulerService>();
    const tableStateManager = mock<TableStateManagerService>();
    const tableGatewayService = mock<TableGatewayService>();

    const params: [...MockProxy<ConstructorParameters<typeof ReadySystemService>>] = [
        jobSchedulerService,
        tableStateManager,
        tableGatewayService,
    ];

    const service = new ReadySystemService(...params);

    beforeEach(() => {
        for (const param of params) {
            mockReset(param);
        }
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    const tableId = `table_1`;

    function mockFindTableState(args: Parameters<typeof mockServerTableState>[0] = {}) {
        tableStateManager.getTableById.mockResolvedValueOnce(mockServerTableState(args));
    }

    function mockScheduleJob(date = new Date()) {
        jobSchedulerService.schedule.mockResolvedValueOnce(date);
    }

    function mockGetJob(exists = true) {
        if (exists) {
            jobSchedulerService.get.mockResolvedValueOnce({
                data: {
                    tableId,
                },
            } as unknown as Job<ReadyQueueJobData>);
        } else {
            jobSchedulerService.get.mockResolvedValueOnce(null);
        }
    }

    /**
     * @description Both `onPlayerReadied` and `onPlayerLeft` can be tested the same way, as their functionality is the same.
     */
    describe.each(['onPlayerReadied', 'onPlayerLeft'] as const)('%s', (fn) => {
        it('should start queue if two or more players are in the table, and all players are ready', async () => {
            const startDate = new Date();
            const [player1, player2] = new Array(2).fill(0).map(() => mockPlayer({ ready: true }));

            mockFindTableState({
                seatMap: {
                    0: player1.id,
                    1: player2.id,
                    2: undefined,
                    3: undefined,
                    4: undefined,
                    5: undefined,
                },
                playerMap: {
                    [player1.id]: player1,
                    [player2.id]: player2,
                },
                status: 'lobby',
            });
            mockScheduleJob(startDate);

            await service[fn](tableId);

            expect(jobSchedulerService.schedule).toHaveBeenCalled();
            expect(tableGatewayService.emitTableEvent).toHaveBeenCalled();
            expect(tableStateManager.updateTable).toHaveBeenCalledWith(tableId, { startDate });
        });

        it('should not start queue if table is not in lobby', async () => {
            const startDate = new Date();
            const [player1, player2] = new Array(2).fill(0).map(() => mockPlayer({ ready: true }));

            mockFindTableState({
                seatMap: {
                    0: player1.id,
                    1: player2.id,
                    2: undefined,
                    3: undefined,
                    4: undefined,
                    5: undefined,
                },
                playerMap: {
                    [player1.id]: player1,
                    [player2.id]: player2,
                },
                status: 'in-progress',
            });
            mockScheduleJob(startDate);

            await service[fn](tableId);

            expect(jobSchedulerService.schedule).not.toHaveBeenCalled();
            expect(tableGatewayService.emitTableEvent).toHaveBeenCalledWith(tableId, {
                type: 'tableStatusChanged',
                status: 'lobby',
                startDate: null,
            });
            expect(tableStateManager.updateTable).toHaveBeenCalledWith(tableId, { startDate: null });
        });

        it('should not start queue if less than two players in game', async () => {
            const startDate = new Date();

            const [player1] = new Array(1).fill(0).map(() => mockPlayer({ ready: true }));

            mockFindTableState({
                seatMap: {
                    0: player1.id,
                    1: undefined,
                    2: undefined,
                    3: undefined,
                    4: undefined,
                    5: undefined,
                },
                playerMap: {
                    [player1.id]: player1,
                },
                status: 'lobby',
            });
            mockScheduleJob(startDate);

            await service.onPlayerReadied(tableId);

            expect(jobSchedulerService.schedule).not.toHaveBeenCalled();
            expect(tableGatewayService.emitTableEvent).toHaveBeenCalledWith(tableId, {
                type: 'tableStatusChanged',
                status: 'lobby',
                startDate: null,
            });
            expect(tableStateManager.updateTable).toHaveBeenCalledWith(tableId, { startDate: null });
        });

        it('should not start queue if not all players are ready', async () => {
            const startDate = new Date();

            // sets every odd player to ready `false`
            const [player1, player2] = new Array(2).fill(0).map((_, idx) => mockPlayer({ ready: idx % 2 === 0 }));

            mockFindTableState({
                seatMap: {
                    0: player1.id,
                    1: player2.id,
                    2: undefined,
                    3: undefined,
                    4: undefined,
                    5: undefined,
                },
                playerMap: {
                    [player1.id]: player1,
                    [player2.id]: player2,
                },
                status: 'lobby',
            });
            mockScheduleJob(startDate);

            await service.onPlayerReadied(tableId);

            expect(jobSchedulerService.schedule).not.toHaveBeenCalled();
            expect(tableGatewayService.emitTableEvent).toHaveBeenCalledWith(tableId, {
                type: 'tableStatusChanged',
                status: 'lobby',
                startDate: null,
            });
            expect(tableStateManager.updateTable).toHaveBeenCalledWith(tableId, { startDate: null });
        });
    });

    describe('onPlayerJoined', () => {
        it('should stop queue if player joins active lobby', async () => {
            const [player1, player2] = new Array(2).fill(0).map(() => mockPlayer({ ready: true }));

            mockFindTableState({
                seatMap: {
                    0: player1.id,
                    1: player2.id,
                    2: undefined,
                    3: undefined,
                    4: undefined,
                    5: undefined,
                },
                playerMap: {
                    [player1.id]: player1,
                    [player2.id]: player2,
                },
                status: 'lobby',
            });
            mockGetJob(true);

            await service.onPlayerJoined(tableId);

            expect(jobSchedulerService.remove).toHaveBeenCalled();
            expect(tableGatewayService.emitTableEvent).toHaveBeenCalled();
            expect(tableStateManager.updateTable).toHaveBeenCalledWith(tableId, { startDate: null });
        });

        it('should not stop queue if table status is not lobby', async () => {
            const [player1, player2] = new Array(2).fill(0).map(() => mockPlayer({ ready: true }));

            mockFindTableState({
                seatMap: {
                    0: player1.id,
                    1: player2.id,
                    2: undefined,
                    3: undefined,
                    4: undefined,
                    5: undefined,
                },
                playerMap: {
                    [player1.id]: player1,
                    [player2.id]: player2,
                },
                status: 'in-progress',
            });
            mockGetJob(true);

            await service.onPlayerJoined(tableId);

            expect(jobSchedulerService.remove).not.toHaveBeenCalled();
            expect(tableGatewayService.emitTableEvent).not.toHaveBeenCalled();
            expect(tableStateManager.updateTable).not.toHaveBeenCalledWith(tableId, { startDate: null });
        });
    });
});
