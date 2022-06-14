import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { mockCard, mockPlayer, mockServerTableState } from '@poker-moons/shared/testing';
import { PlayerAction } from '@poker-moons/shared/type';
import { createTestingModuleFactory, SpyObject } from '@trellisorg/nest-spectator';
import { left, right } from 'fp-ts/lib/Either';
import { RoundManagerService } from '../../../round/round-manager/round-manager.service';
import { TableGatewayService } from '../../../shared/websocket/table-gateway.service';
import { TableStateManagerService } from '../../../table-state-manager/table-state-manager.service';
import { FoldActionHandlerService } from './fold-action-handler.service';

describe('FoldActionHandlerService', () => {
    let service: FoldActionHandlerService;

    let tableGatewayService: SpyObject<TableGatewayService>;
    let tableStateManagerService: SpyObject<TableStateManagerService>;
    let roundManagerService: SpyObject<RoundManagerService>;

    beforeEach(async () => {
        const module = await createTestingModuleFactory({
            providers: [FoldActionHandlerService],
            mocks: [TableGatewayService, TableStateManagerService, RoundManagerService],
        }).compile();

        service = module.get<FoldActionHandlerService>(FoldActionHandlerService);

        tableGatewayService = module.get(TableGatewayService);
        tableStateManagerService = module.get(TableStateManagerService);
        roundManagerService = module.get(RoundManagerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    const table = mockServerTableState({ activeRound: { activeSeat: 1, toCall: 0 } });

    const player = mockPlayer({
        id: 'player_1',
        seatId: 1,
        username: 'Levi',
        cards: [mockCard({ suit: 'clubs', rank: '2' }), mockCard({ suit: 'hearts', rank: '3' })],
        biddingCycleCalled: 200,
    });

    const action: PlayerAction = { type: 'fold' };

    describe('canFold', () => {
        it('should return table, player, and action if valid', async () => {
            const result = await service.canFold(table, player, action);

            expect(result).toEqual(right({ table, player, action }));
        });

        it('should return PokerMoonsError if it is not the players turn', async () => {
            const table = mockServerTableState({ activeRound: { activeSeat: 2, toCall: 0 } });

            const result = await service.canFold(table, player, action);

            expect(result).toEqual(left("Not player's turn."));
        });
    });

    describe('fold', () => {
        it('should update player status, emit PlayerTurnEvent, and start next turn', async () => {
            await service.fold(right({ table, player }));

            expect(tableStateManagerService.updateTablePlayer).toHaveBeenCalledWith(table.id, player.id, {
                status: 'folded',
            });

            expect(tableGatewayService.emitTableEvent).toHaveBeenCalledWith(table.id, {
                type: 'turn',
                playerId: player.id,
                newStatus: 'folded',
                newActiveSeatId: 2,
                bidAmount: 0,
            });

            expect(roundManagerService.startNextTurn).toHaveBeenCalled();
        });

        it('should throw InternalServerError exception if the round does not have an active seat', async () => {
            const table = mockServerTableState({ activeRound: { activeSeat: null } });

            await expect(service.fold(right({ table, player }))).rejects.toThrow(
                new InternalServerErrorException('Something went wrong, no active seat is set!'),
            );
        });

        it('should throw BadRequestException if it is not the players turn', async () => {
            await expect(service.fold(left("Not player's turn."))).rejects.toThrow(
                new BadRequestException("Not player's turn."),
            );
        });
    });
});
