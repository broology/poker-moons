import {
    PlayerJoinedTableEvent,
    PlayerLeftTableEvent,
    PlayerTurnEvent,
    PublicPlayer,
    RoundStatusChangedEvent,
    SeatId,
    TableId,
    WinnerWinnerChickenDinnerEvent,
} from '@poker-moons/shared/type';
import { Test } from '@nestjs/testing';
import { TableGatewayService } from './table-gateway.service';
import { mockCard, mockPublicPlayer } from '@poker-moons/shared/testing';

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
            const roundStatusChangedEvent: RoundStatusChangedEvent = {
                type: 'roundStatusChanged',
                status: 'flop',
                cards: [mockCard(), mockCard({ suit: 'hearts', rank: '12' }), mockCard({ suit: 'spades', rank: '05' })],
            };

            serverSpy.mockReturnValue({
                emit: (type: string, event: RoundStatusChangedEvent) => {
                    expect(type).toEqual('roundStatusChanged');
                    expect(event).toEqual(roundStatusChangedEvent);
                },
            });

            service.emitTableEvent(tableId, roundStatusChangedEvent);

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
                displayText: `${player.username} has won!`,
                pot: 10000,
                playerId: player.id,
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
