import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { mockCard, mockPlayer, mockServerTableState } from '@poker-moons/shared/testing';
import { PlayerAction } from '@poker-moons/shared/type';
import { createTestingModuleFactory, SpyObject } from '@trellisorg/nest-spectator';
import { left, right } from 'fp-ts/lib/Either';
import { PotManagerService } from '../../../round/pot-manager/pot-manager.service';
import { RoundManagerService } from '../../../round/round-manager/round-manager.service';
import { TableGatewayService } from '../../../shared/websocket/table-gateway.service';
import { TableStateManagerService } from '../../../table-state-manager/table-state-manager.service';
import { CallActionHandlerService } from './call-action-handler.service';

describe('CallActionHandlerService', () => {
    let service: CallActionHandlerService;

    let tableGatewayService: SpyObject<TableGatewayService>;
    let tableStateManagerService: SpyObject<TableStateManagerService>;
    let potManagerService: SpyObject<PotManagerService>;
    let roundManagerService: SpyObject<RoundManagerService>;

    beforeEach(async () => {
        const module = await createTestingModuleFactory({
            providers: [CallActionHandlerService],
            mocks: [TableGatewayService, TableStateManagerService, PotManagerService, RoundManagerService],
        }).compile();

        service = module.get<CallActionHandlerService>(CallActionHandlerService);

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

    const action: PlayerAction = { type: 'call' };

    describe('canCheck', () => {
        it('should return table, player, and action if valid', async () => {
            const result = await service.canCall(table, player, action);

            expect(result).toEqual(right({ table, player, action }));
        });

        it('should return PokerMoonsError if it is not the players turn', async () => {
            const table = mockServerTableState({ activeRound: { activeSeat: 2, toCall: 0 } });

            const result = await service.canCall(table, player, action);

            expect(result).toEqual(left("Not player's turn."));
        });

        it('should return PokerMoonsError if attempting to call when not enough chips in stack', async () => {
            const table = mockServerTableState({ activeRound: { activeSeat: 1, toCall: 100 } });

            const result = await service.canCall(table, { ...player, stack: 50 }, action);

            expect(result).toEqual(left(`Minimum to call is 100.`));
        });
    });

    describe('check', () => {
        it('should update player, increment pot, emit PlayerTurnEvent, and start next turn', async () => {
            await service.call(right({ table, player }));

            expect(tableStateManagerService.updateTablePlayer).toHaveBeenCalledWith(table.id, player.id, {
                status: 'biddingCycleCalled',
                biddingCycleCalled: player.biddingCycleCalled + table.activeRound.toCall,
                stack: player.stack - table.activeRound.toCall,
            });

            expect(potManagerService.incrementPot).toHaveBeenCalledWith(
                table.id,
                table.activeRound.pot,
                table.activeRound.toCall,
            );

            expect(tableGatewayService.emitTableEvent).toHaveBeenCalledWith(table.id, {
                type: 'turn',
                playerId: player.id,
                newStatus: 'biddingCycleCalled',
                newActiveSeatId: 2,
                bidAmount: table.activeRound.toCall,
            });

            expect(roundManagerService.startNextTurn).toHaveBeenCalled();
        });

        it('should throw InternalServerError exception if the round does not have an active seat', async () => {
            const table = mockServerTableState({ activeRound: { activeSeat: null } });

            await expect(service.call(right({ table, player }))).rejects.toThrow(
                new InternalServerErrorException('Something went wrong, no active seat is set!'),
            );
        });

        it('should throw BadRequestException if it is not the players turn', async () => {
            await expect(service.call(left("Not player's turn."))).rejects.toThrow(
                new BadRequestException("Not player's turn."),
            );
        });

        it('should throw BadRequestException if attempting to call when the player does not have enough chips in stack', async () => {
            await expect(service.call(left('Minimum to call is 100.'))).rejects.toThrow(
                new BadRequestException('Minimum to call is 100.'),
            );
        });
    });
});
