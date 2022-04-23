import { Job } from 'bull';
import type { MockProxy } from 'jest-mock-extended';
import { mock, mockReset } from 'jest-mock-extended';
import { TableStateManagerService } from '../../table-state-manager/table-state-manager.service';
import { TableGatewayService } from '../websocket/table-gateway.service';
import { TurnTimerConsumer } from './turn-timer.consumer';
import { TurnTimerQueueJobData } from './turn-timer.type';

describe('TurnTimerConsumer', () => {
    const tableGatewayService = mock<TableGatewayService>();
    const tableStateManager = mock<TableStateManagerService>();

    const params: [...MockProxy<ConstructorParameters<typeof TurnTimerConsumer>>] = [
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

        /**
         * TODO #142
         */
        it.todo('should perform a "check" event by default');

        /**
         * TODO #142
         */
        it.todo('should perform a "fold" event if check is not available');
    });
});
