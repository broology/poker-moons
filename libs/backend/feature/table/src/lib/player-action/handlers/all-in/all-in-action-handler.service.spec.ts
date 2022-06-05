import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { mockCard, mockPlayer, mockServerTableState } from '@poker-moons/shared/testing';
import { PlayerAction } from '@poker-moons/shared/type';
import { createTestingModuleFactory, SpyObject } from '@trellisorg/nest-spectator';
import { left, right } from 'fp-ts/lib/Either';
import { PotManagerService } from '../../../round/pot-manager/pot-manager.service';
import { RoundManagerService } from '../../../round/round-manager/round-manager.service';
import { TableGatewayService } from '../../../shared/websocket/table-gateway.service';
import { TableStateManagerService } from '../../../table-state-manager/table-state-manager.service';
import { AllInActionHandlerService } from './all-in-action-handler.service';

describe('AllInActionHandlerService', () => {
    let service: AllInActionHandlerService;

    let tableGatewayService: SpyObject<TableGatewayService>;
    let tableStateManagerService: SpyObject<TableStateManagerService>;
    let potManagerService: SpyObject<PotManagerService>;
    let roundManagerService: SpyObject<RoundManagerService>;

    beforeEach(async () => {
        const module = await createTestingModuleFactory({
            providers: [AllInActionHandlerService],
            mocks: [TableGatewayService, TableStateManagerService, PotManagerService, RoundManagerService],
        }).compile();

        service = module.get<AllInActionHandlerService>(AllInActionHandlerService);

        tableGatewayService = module.get(TableGatewayService);
        tableStateManagerService = module.get(TableStateManagerService);
        potManagerService = module.get(PotManagerService);
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

    const action: PlayerAction = { type: 'all-in' };

    describe('canAllIn', () => {
        it('should return table, player, and action if valid', async () => {
            const result = await service.canAllIn(table, player, action);

            expect(result).toEqual(right({ table, player }));
        });

        it('should return PokerMoonsError if it is not the players turn', async () => {
            const table = mockServerTableState({ activeRound: { activeSeat: 2, toCall: 0 } });

            const result = await service.canAllIn(table, player, action);

            expect(result).toEqual(left("Not player's turn."));
        });
    });

    describe('allIn', () => {
        it('should update player, increment pot, update toCall amount, emit PlayerTurnEvent, and start next turn', async () => {
            await service.allIn(right({ table, player }));

            expect(tableStateManagerService.updateTablePlayer).toHaveBeenCalledWith(table.id, player.id, {
                status: 'all-in',
                biddingCycleCalled: player.biddingCycleCalled + player.stack,
                stack: 0,
            });

            expect(potManagerService.incrementPot).toHaveBeenCalledWith(table.id, table.activeRound.pot, player.stack);

            expect(tableStateManagerService.updateRound).toHaveBeenCalledWith(table.id, {
                toCall: table.activeRound.toCall + player.stack,
            });

            expect(tableGatewayService.emitTableEvent).toHaveBeenCalledWith(table.id, {
                type: 'turn',
                playerId: player.id,
                newStatus: 'all-in',
                newActiveSeatId: 2,
                bidAmount: player.stack,
            });

            expect(roundManagerService.startNextTurn).toHaveBeenCalled();
        });

        it('should throw InternalServerError exception if the round does not have an active seat', async () => {
            const table = mockServerTableState({ activeRound: { activeSeat: null } });

            await expect(service.allIn(right({ table, player, action }))).rejects.toThrow(
                new InternalServerErrorException('Something went wrong, no active seat is set!'),
            );
        });

        it('should throw BadRequestException if it is not the players turn', async () => {
            await expect(service.allIn(left("Not player's turn."))).rejects.toThrow(
                new BadRequestException("Not player's turn."),
            );
        });
    });
});
