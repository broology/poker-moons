import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { mockCard, mockPlayer, mockServerTableState } from '@poker-moons/shared/testing';
import { PlayerAction } from '@poker-moons/shared/type';
import { createTestingModuleFactory, SpyObject } from '@trellisorg/nest-spectator';
import { left, right } from 'fp-ts/lib/Either';
import { PotManagerService } from '../../../round/pot-manager/pot-manager.service';
import { RoundManagerService } from '../../../round/round-manager/round-manager.service';
import { TableGatewayService } from '../../../shared/websocket/table-gateway.service';
import { TableStateManagerService } from '../../../table-state-manager/table-state-manager.service';
import { RaiseActionHandlerService } from './raise-action-handler.service';

describe('RaiseActionHandlerService', () => {
    let service: RaiseActionHandlerService;

    let tableGatewayService: SpyObject<TableGatewayService>;
    let tableStateManagerService: SpyObject<TableStateManagerService>;
    let potManagerService: SpyObject<PotManagerService>;
    let roundManagerService: SpyObject<RoundManagerService>;

    beforeEach(async () => {
        const module = await createTestingModuleFactory({
            providers: [RaiseActionHandlerService],
            mocks: [TableGatewayService, TableStateManagerService, PotManagerService, RoundManagerService],
        }).compile();

        service = module.get<RaiseActionHandlerService>(RaiseActionHandlerService);

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

    const action: PlayerAction = { type: 'raise', amount: 50 };

    describe('canRaise', () => {
        it('should return table, player, and action if valid', async () => {
            const result = await service.canRaise(table, player, action);

            expect(result).toEqual(right({ table, player, action }));
        });

        it('should return PokerMoonsError if it is not the players turn', async () => {
            const table = mockServerTableState({ activeRound: { activeSeat: 2, toCall: 0 } });

            const result = await service.canRaise(table, player, action);

            expect(result).toEqual(left("Not player's turn."));
        });

        it('should return PokerMoonsError if stack is less than toCall amount', async () => {
            const table = mockServerTableState({ activeRound: { activeSeat: 1, toCall: 100 } });

            const result = await service.canRaise(table, { ...player, stack: 50 }, action);

            expect(result).toEqual(left(`Minimum to raise is 100.`));
        });

        it('should return PokerMoonsError if attempting to raise more than available in stack', async () => {
            const result = await service.canRaise(table, { ...player, stack: 20 }, action);

            expect(result).toEqual(left(`Player does not have ${action.amount} in their stack.`));
        });
    });

    describe('raise', () => {
        it('should update player, increment pot, update toCall amount, emit PlayerTurnEvent, and start next turn', async () => {
            await service.raise(right({ table, player, action }));

            expect(tableStateManagerService.updateTablePlayer).toHaveBeenCalledWith(table.id, player.id, {
                status: 'raised',
                biddingCycleCalled: player.biddingCycleCalled + action.amount,
                stack: player.stack - action.amount,
            });

            expect(potManagerService.incrementPot).toHaveBeenCalledWith(table.id, table.activeRound.pot, action.amount);

            expect(tableStateManagerService.updateRound).toHaveBeenCalledWith(table.id, {
                toCall: table.activeRound.toCall + action.amount,
            });

            expect(tableGatewayService.emitTableEvent).toHaveBeenCalledWith(table.id, {
                type: 'turn',
                playerId: player.id,
                newStatus: 'raised',
                newActiveSeatId: 2,
                bidAmount: action.amount,
            });

            expect(roundManagerService.startNextTurn).toHaveBeenCalled();
        });

        it('should throw InternalServerError exception if the round does not have an active seat', async () => {
            const table = mockServerTableState({ activeRound: { activeSeat: null } });

            await expect(service.raise(right({ table, player, action }))).rejects.toThrow(
                new InternalServerErrorException('Something went wrong, no active seat is set!'),
            );
        });

        it('should throw BadRequestException if it is not the players turn', async () => {
            await expect(service.raise(left("Not player's turn."))).rejects.toThrow(
                new BadRequestException("Not player's turn."),
            );
        });

        it('should throw BadRequestException if stack is less than toCall amount', async () => {
            await expect(service.raise(left('Minimum to raise is 100.'))).rejects.toThrow(
                new BadRequestException('Minimum to raise is 100.'),
            );
        });

        it('should throw BadRequestException if attempting to raise more than available in stack', async () => {
            await expect(service.raise(left(`Player does not have ${action.amount} in their stack.`))).rejects.toThrow(
                new BadRequestException(`Player does not have ${action.amount} in their stack.`),
            );
        });
    });
});
