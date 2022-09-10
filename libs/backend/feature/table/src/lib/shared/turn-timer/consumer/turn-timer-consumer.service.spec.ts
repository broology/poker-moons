import { mockPlayer, mockServerTableState } from '@poker-moons/shared/testing';
import { Job } from 'bull';
import { mock, mockReset } from 'jest-mock-extended';
import { PlayerActionService } from '../../../player-action/player-action.service';
import { TableStateManagerService } from '../../../table-state-manager/table-state-manager.service';
import { TableGatewayService } from '../../websocket/table-gateway.service';
import { TurnTimerQueueJobData } from '../turn-timer.type';
import { TurnTimerServiceConsumer } from './turn-timer-consumer.service';

describe('TurnTimerServiceConsumer', () => {
    const playerActionService = mock<PlayerActionService>();
    const tableGatewayService = mock<TableGatewayService>();
    const tableStateManager = mock<TableStateManagerService>();

    const params: ConstructorParameters<typeof TurnTimerServiceConsumer> = [
        playerActionService,
        tableGatewayService,
        tableStateManager,
    ];

    const service = new TurnTimerServiceConsumer(...params);

    beforeEach(() => {
        for (const param of params) {
            mockReset(param);
        }
    });

    describe('onComplete', () => {
        const tableId = `table_1`;
        const playerId = `player_1`;
        const startDate = new Date();

        function mockJob(): Job<TurnTimerQueueJobData> {
            return {
                data: <TurnTimerQueueJobData>{
                    tableId,
                    playerId,
                    startDate,
                },
            } as unknown as Job<TurnTimerQueueJobData>;
        }

        it('should update player time bank to 0 and emit event updating time bank on client', async () => {
            tableStateManager.getTableById.mockResolvedValue(mockServerTableState());

            await service.onComplete(mockJob());

            expect(tableStateManager.updateTablePlayer).toHaveBeenCalledWith<
                Parameters<TableStateManagerService['updateTablePlayer']>
            >(tableId, playerId, {
                timeBank: 0,
            });
            expect(tableGatewayService.emitTableEvent).toHaveBeenCalledWith(tableId, {
                type: 'playerChanged',
                id: playerId,
                timeBank: 0,
            });
        });

        it('should auto-fold for the player if call amount is greater than zero', async () => {
            const table = {
                ...mockServerTableState({
                    activeRound: {
                        toCall: 10,
                    },
                }),
                playerMap: {
                    player_1: mockPlayer({ status: 'called' }),
                    playerId: mockPlayer({ status: 'waiting' }),
                },
            };

            tableStateManager.getTableById.mockResolvedValue(table);

            const job = mockJob();

            await service.onComplete(job);

            expect(playerActionService.perform).toHaveBeenCalledWith(job.data.tableId, job.data.playerId, {
                action: { type: 'fold' },
            });
        });

        it('should auto-check for the player if no one has called or raised', async () => {
            const table = {
                ...mockServerTableState({
                    activeRound: {
                        toCall: 0,
                    },
                }),
                playerMap: {
                    player_1: mockPlayer({ status: 'checked' }),
                    playerId: mockPlayer({ status: 'waiting' }),
                },
            };

            tableStateManager.getTableById.mockResolvedValue(table);

            const job = mockJob();

            await service.onComplete(job);

            expect(playerActionService.perform).toHaveBeenCalledWith(job.data.tableId, job.data.playerId, {
                action: { type: 'check' },
            });
        });
    });
});
