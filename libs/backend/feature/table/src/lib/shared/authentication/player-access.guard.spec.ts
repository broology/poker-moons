import { mock, mockReset } from 'jest-mock-extended';
import { nanoid } from 'nanoid';
import { TableStateManagerService } from '../../table-state-manager/table-state-manager.service';
import { PlayerAccessGuard } from './player-access.guard';

import { ExecutionContext, NotFoundException } from '@nestjs/common';
import { mockServerTableState } from '@poker-moons/shared/testing';

describe('PlayerAccessGuard', () => {
    const tableStateManager = mock<TableStateManagerService>();

    const dependencies: ConstructorParameters<typeof PlayerAccessGuard> = [tableStateManager];

    const service = new PlayerAccessGuard(...dependencies);

    beforeEach(() => dependencies.forEach(mockReset));

    describe('canActivate', () => {
        const tableId = `table_1`;
        const playerId = `player_1`;
        const token = nanoid(40);
        const bearer = `Bearer ${token}`;

        function mockContext(
            overrides: Partial<{ tableId: string | null; playerId: string | null; bearer: string | null }> = {},
        ): ExecutionContext {
            return {
                switchToHttp: () => ({
                    getRequest: () => ({
                        params: {
                            tableId: overrides.tableId ?? tableId,
                            playerId: overrides.playerId ?? playerId,
                        },
                        headers: {
                            authorization: overrides.bearer ?? bearer,
                        },
                    }),
                }),
            } as never;
        }

        it('should return true when client making request has correct token', async () => {
            const validContext = mockContext();

            tableStateManager.getTableById.calledWith(tableId).mockResolvedValueOnce(
                mockServerTableState({
                    playerMap: {
                        [playerId]: {
                            token,
                        },
                    },
                }),
            );

            await service.canActivate(validContext);
        });

        it('should return false when client making request for non existent table', async () => {
            const validContext = mockContext();

            tableStateManager.getTableById.calledWith(tableId).mockRejectedValueOnce(new NotFoundException());

            await service.canActivate(validContext);
        });

        it('should return false when client making request for non existent player', async () => {
            const validContext = mockContext();

            tableStateManager.getTableById.calledWith(tableId).mockResolvedValueOnce(
                mockServerTableState({
                    playerMap: {},
                }),
            );

            await service.canActivate(validContext);
        });

        it.each([null, 'Bearer invalid', ''])(
            'should return false when client making request has a "%s" token',
            async (failBearer) => {
                const validContext = mockContext({
                    bearer: failBearer,
                });

                tableStateManager.getTableById.calledWith(tableId).mockResolvedValueOnce(
                    mockServerTableState({
                        playerMap: {
                            [playerId]: {
                                token,
                            },
                        },
                    }),
                );

                await service.canActivate(validContext);
            },
        );
    });
});
