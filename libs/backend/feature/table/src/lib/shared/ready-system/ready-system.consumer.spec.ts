import { Job } from 'bull';
import type { MockProxy } from 'jest-mock-extended';
import { mock, mockReset } from 'jest-mock-extended';
import { TableStateManagerService } from '../../table-state-manager/table-state-manager.service';
import { TableGatewayService } from '../websocket/table-gateway.service';
import { ReadySystemConsumer } from './ready-system.consumer';
import { ReadyQueueJobData } from './ready-system.type';

describe('ReadySystemConsumer', () => {
    const tableGatewayService = mock<TableGatewayService>();
    const tableStateManager = mock<TableStateManagerService>();

    const params: [...MockProxy<ConstructorParameters<typeof ReadySystemConsumer>>] = [
        tableGatewayService,
        tableStateManager,
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

        it('should update table state and emit event changing tables status to in-progress', async () => {
            await service.onComplete(mockJob());

            expect(tableStateManager.updateTable).toHaveBeenCalledWith<
                Parameters<TableStateManagerService['updateTable']>
            >(tableId, {
                startDate: expect.any(Date),
                status: 'in-progress',
            });
            expect(tableGatewayService.emitTableEvent).toHaveBeenCalled();
        });
    });
});
