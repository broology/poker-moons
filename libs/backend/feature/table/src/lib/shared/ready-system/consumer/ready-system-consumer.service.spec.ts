import { Job } from 'bull';
import type { MockProxy } from 'jest-mock-extended';
import { mock, mockReset } from 'jest-mock-extended';
import { RoundManagerService } from '../../../round/round-manager/round-manager.service';
import { TableStateManagerService } from '../../../table-state-manager/table-state-manager.service';
import { TableGatewayService } from '../../websocket/table-gateway.service';
import { ReadyQueueJobData } from '../ready-system.type';
import { ReadySystemConsumer } from './ready-system-consumer.service';

describe('ReadySystemConsumer', () => {
    const tableGatewayService = mock<TableGatewayService>();
    const tableStateManager = mock<TableStateManagerService>();
    const roundManagerService = mock<RoundManagerService>();

    const params: [...MockProxy<ConstructorParameters<typeof ReadySystemConsumer>>] = [
        tableGatewayService,
        tableStateManager,
        roundManagerService,
    ];

    const service = new ReadySystemConsumer(...params);

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
        function mockJob(): Job<ReadyQueueJobData> {
            return {
                data: {
                    tableId,
                },
            } as unknown as Job<ReadyQueueJobData>;
        }

        it('should update table state, emit event changing tables status to in-progress, and start round', async () => {
            await service.onComplete(mockJob());

            expect(tableStateManager.updateTable).toHaveBeenCalledWith<
                Parameters<TableStateManagerService['updateTable']>
            >(tableId, {
                startDate: expect.any(Date),
                status: 'in-progress',
            });

            expect(tableGatewayService.emitTableEvent).toHaveBeenCalled();

            expect(roundManagerService.startRound).toHaveBeenCalledWith(tableId);
        });
    });
});
