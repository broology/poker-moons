import { mockPlayer, mockServerTableState } from '@poker-moons/shared/testing';
import { Job } from 'bull';
import type { MockProxy } from 'jest-mock-extended';
import { mock, mockReset } from 'jest-mock-extended';
import { CheckActionHandlerService } from '../../player-action/handlers/check/check-action-handler.service';
import { FoldActionHandlerService } from '../../player-action/handlers/fold/fold-action-handler.service';
import { TableStateManagerService } from '../../table-state-manager/table-state-manager.service';
import { TableGatewayService } from '../websocket/table-gateway.service';
import { TurnTimerConsumer } from './turn-timer.consumer';
import { TurnTimerQueueJobData } from './turn-timer.type';

describe('TurnTimerConsumer', () => {
    const checkActionHandlerService = mock<CheckActionHandlerService>();
    const foldActionHandlerService = mock<FoldActionHandlerService>();
    const tableGatewayService = mock<TableGatewayService>();
    const tableStateManager = mock<TableStateManagerService>();

    const params: [...MockProxy<ConstructorParameters<typeof TurnTimerConsumer>>] = [
        checkActionHandlerService,
        foldActionHandlerService,
        tableGatewayService,
        tableStateManager,
    ];

    const service = new TurnTimerConsumer(...params);

    beforeEach(() => {
        for (const param of params) {
            mockReset(param);
        }
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
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
                type: 'playerTimeBank',
                playerId,
                timeBank: 0,
            });
        });

        it('should auto-fold for the player if anyone has raised', async () => {
            const table = {
                ...mockServerTableState(),
                playerMap: {
                    player_0: mockPlayer({ status: 'raised' }),
                    playerId: mockPlayer({ status: 'waiting' }),
                },
            };

            tableStateManager.getTableById.mockResolvedValue(table);

            await service.onComplete(mockJob());

            expect(foldActionHandlerService.fold).toHaveBeenCalled();
        });

        it('should auto-check for the player if no one has raised', async () => {
            const table = {
                ...mockServerTableState(),
                playerMap: {
                    player_0: mockPlayer({ status: 'checked' }),
                    playerId: mockPlayer({ status: 'waiting' }),
                },
            };

            tableStateManager.getTableById.mockResolvedValue(table);

            await service.onComplete(mockJob());

            expect(checkActionHandlerService.check).toHaveBeenCalled();
        });
    });
});
