import { Test } from '@nestjs/testing';
import { mockCard, mockPublicPlayer } from '@poker-moons/shared/testing';
import {
    Card,
    PlayerJoinedTableEvent,
    PlayerLeftTableEvent,
    PlayerTurnEvent,
    PublicPlayer,
    RoundChangedEvent,
    SeatId,
    TableId,
    WinnerWinnerChickenDinnerEvent,
} from '@poker-moons/shared/type';
import { TableGatewayService } from './table-gateway.service';

describe('TableGatewayService', () => {
    let service: TableGatewayService;

    let serverSpy: jest.SpyInstance;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [TableGatewayService],
        }).compile();

        const mockServer = { to: jest.fn };

        serverSpy = jest.spyOn(mockServer, 'to');

        service = module.get<TableGatewayService>(TableGatewayService);
        service.init(mockServer as any);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    const tableId: TableId = 'table_1';
    const seatId: SeatId = 2;
    const player: PublicPlayer = mockPublicPlayer();

    describe('emitPlayerJoinedTableEvent', () => {
        it('should call server.to with the correct info', () => {
            const playerJoinedTableEvent: PlayerJoinedTableEvent = { type: 'playerJoined', seatId, player };

            serverSpy.mockReturnValue({
                emit: (type: string, event: PlayerJoinedTableEvent) => {
                    expect(type).toEqual('playerJoined');
                    expect(event).toEqual(playerJoinedTableEvent);
                },
            });

            service.emitTableEvent(tableId, playerJoinedTableEvent);

            expect(serverSpy).toHaveBeenCalledWith(tableId);
        });
    });

    describe('emitPlayerLeftTableEvent', () => {
        it('should call server.to with the correct info', () => {
            const playerLeftTableEvent: PlayerLeftTableEvent = { type: 'playerLeft', seatId };

            serverSpy.mockReturnValue({
                emit: (type: string, event: PlayerLeftTableEvent) => {
                    expect(type).toEqual('playerLeft');
                    expect(event).toEqual(playerLeftTableEvent);
                },
            });

            service.emitTableEvent(tableId, playerLeftTableEvent);

            expect(serverSpy).toHaveBeenCalledWith(tableId);
        });
    });

    describe('emitRoundStatusChangedEvent', () => {
        it('should call server.to with the correct info', () => {
            const roundChangedEvent: RoundChangedEvent = {
                type: 'roundChanged',
                roundStatus: 'flop',
                activeSeat: 1,
                cards: [mockCard(), mockCard({ suit: 'hearts', rank: '12' }), mockCard({ suit: 'spades', rank: '5' })],
                toCall: 0,
            };

            serverSpy.mockReturnValue({
                emit: (type: string, event: RoundChangedEvent) => {
                    expect(type).toEqual('roundChanged');
                    expect(event).toEqual(roundChangedEvent);
                },
            });

            service.emitTableEvent(tableId, roundChangedEvent);

            expect(serverSpy).toHaveBeenCalledWith(tableId);
        });
    });

    describe('emitPlayerTurnEvent', () => {
        it('should call server.to with the correct info', () => {
            const playerTurnEvent: PlayerTurnEvent = {
                type: 'turn',
                bidAmount: 100,
                newStatus: 'raised',
                playerId: player.id,
                newActiveSeatId: 3,
            };

            serverSpy.mockReturnValue({
                emit: (type: string, event: PlayerTurnEvent) => {
                    expect(type).toEqual('turn');
                    expect(event).toEqual(playerTurnEvent);
                },
            });

            service.emitTableEvent(tableId, playerTurnEvent);

            expect(serverSpy).toHaveBeenCalledWith(tableId);
        });
    });

    describe('emitWinnerWinnerChickenDinnerEvent', () => {
        it('should call server.to with the correct info', () => {
            const winnerEvent: WinnerWinnerChickenDinnerEvent = {
                type: 'winner',
                winners: {
                    [player.id]: {
                        amountWon: 10000,
                        cards: player.cards as [Card, Card],
                        displayText: `${player.username} has won $10,000 with a pair!`,
                    },
                },
            };

            serverSpy.mockReturnValue({
                emit: (type: string, event: WinnerWinnerChickenDinnerEvent) => {
                    expect(type).toEqual('winner');
                    expect(event).toEqual(winnerEvent);
                },
            });

            service.emitTableEvent(tableId, winnerEvent);

            expect(serverSpy).toHaveBeenCalledWith(tableId);
        });
    });
});
