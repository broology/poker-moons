import { InternalServerErrorException } from '@nestjs/common';
import { mockCard, mockPlayer, mockRound, mockServerTableState } from '@poker-moons/shared/testing';
import { Player, PlayerId } from '@poker-moons/shared/type';
import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { TurnTimerService } from '../../shared/turn-timer/turn-timer.service';
import { TableGatewayService } from '../../shared/websocket/table-gateway.service';
import { TableStateManagerService } from '../../table-state-manager/table-state-manager.service';
import { DeckManagerService } from '../deck-manager/deck-manager.service';
import { WinnerDeterminerService } from '../winner-determiner/winner-determiner.service';
import { noStartingPlayer } from './round-manager.copy';
import { RoundManagerService } from './round-manager.service';
import { BlindManagerService } from '../blind-manager/blind-manager.service';

describe('RoundManagerService', () => {
    const deckManagerService = mock<DeckManagerService>();
    const tableGatewayService = mock<TableGatewayService>();
    const tableStateManagerService = mock<TableStateManagerService>();
    const turnTimeService = mock<TurnTimerService>();
    const winnerDeterminerService = mock<WinnerDeterminerService>();
    const blindManagerService = mock<BlindManagerService>();

    const params: [...MockProxy<ConstructorParameters<typeof RoundManagerService>>] = [
        deckManagerService,
        tableGatewayService,
        tableStateManagerService,
        turnTimeService,
        winnerDeterminerService,
        blindManagerService,
    ];

    const service = new RoundManagerService(...params);

    beforeEach(() => {
        for (const param of params) {
            mockReset(param);
        }
    });

    const table = mockServerTableState({
        activeRound: mockRound({ dealerSeat: 0, activeSeat: 1, roundStatus: 'flop' }),
    });
    const playerStatuses = Object.values(table.playerMap).map((player) => player.status);
    const card = mockCard({ suit: 'diamonds', rank: '10' });
    const deck = [card, mockCard()];

    describe('startNextTurn', () => {
        it('should update the round and trigger turn timer for next player', async () => {
            tableStateManagerService.getTableById.mockResolvedValue(table);

            await service.startNextTurn(table, 2, playerStatuses);

            expect(tableStateManagerService.updateRound).toHaveBeenCalledWith(table.id, {
                turnCount: table.activeRound.turnCount + 1,
                activeSeat: 2,
            });

            expect(turnTimeService.onTurn).toHaveBeenCalledWith({
                tableId: table.id,
                currentPlayerId: table.seatMap[1],
                nextPlayerId: table.seatMap[2],
            });
        });

        it('should advance round to next stage if everyone has taken their turn and bidding cycle has ended', async () => {
            table.activeRound.cards.push(card);

            // Player map with ended bidding cycle
            const playerMap: Record<PlayerId, Player> = {
                player_1: mockPlayer({ biddingCycleCalled: 10, status: 'raised' }),
                player_2: mockPlayer({ biddingCycleCalled: 10, status: 'called' }),
            };

            tableStateManagerService.getTableById.mockResolvedValue(table);
            deckManagerService.drawCard.mockResolvedValue({ card, deck: [mockCard()] });

            await service.startNextTurn({ ...table, playerMap }, 2, ['checked', 'checked', 'checked']);

            expect(tableStateManagerService.updateRound).toHaveBeenCalledWith(table.id, {
                cards: table.activeRound.cards,
                roundStatus: 'turn',
                toCall: 0,
            });

            expect(tableGatewayService.emitTableEvent).toHaveBeenCalledWith(table.id, {
                type: 'roundChanged',
                roundStatus: 'turn',
                activeSeat: 2,
                cards: table.activeRound.cards,
                toCall: 0,
            });
        });
    });

    describe('startRound', () => {
        it('should deal cards to players, emit round status changed event, and start timer for first player', async () => {
            const table = mockServerTableState({ activeRound: mockRound({ activeSeat: 1, roundStatus: 'deal' }) });

            tableStateManagerService.getTableById.mockResolvedValue(table);
            deckManagerService.buildDeck.mockResolvedValue(deck);
            deckManagerService.drawCard.mockResolvedValue({ card, deck });

            await service.startRound(table.id);

            expect(tableStateManagerService.updateTablePlayer).toHaveBeenCalledWith(table.id, 'player_0', {
                cards: [card, card],
            });

            expect(tableStateManagerService.updateTablePlayer).toHaveBeenCalledWith(table.id, 'player_1', {
                cards: [card, card],
            });

            expect(tableGatewayService.emitTableEvent).toHaveBeenCalledWith(table.id, {
                type: 'roundChanged',
                roundStatus: 'deal',
                activeSeat: 1,
                cards: [],
                toCall: 10,
                pot: 15,
            });

            expect(turnTimeService.onStart).toHaveBeenCalledWith({
                tableId: table.id,
                startingPlayerId: table.seatMap[1],
            });
        });

        it('should set an active seat if there is not one', async () => {
            const table = mockServerTableState({
                activeRound: mockRound({ dealerSeat: 0, activeSeat: null, roundStatus: 'deal' }),
            });

            tableStateManagerService.getTableById.mockResolvedValue(table);
            deckManagerService.buildDeck.mockResolvedValue(deck);
            deckManagerService.drawCard.mockResolvedValue({ card, deck });

            await service.startRound(table.id);

            expect(tableStateManagerService.updateRound).toHaveBeenCalledWith(table.id, {
                activeSeat: 1,
            });
        });

        it('should throw InternalServerErrorException if not player is found at the active seat', async () => {
            const table = {
                ...mockServerTableState({ activeRound: mockRound({ activeSeat: 1, roundStatus: 'deal' }) }),
                seatMap: {},
            };

            tableStateManagerService.getTableById.mockResolvedValue(table);

            await expect(() => service.startRound(table.id)).rejects.toThrow(
                new InternalServerErrorException(noStartingPlayer),
            );
        });
    });

    describe('endRound', () => {
        it('should stop player timer, call winner determiner, and update table status to ended if only one player has chips left', async () => {
            const table = {
                ...mockServerTableState({ activeRound: mockRound({ activeSeat: 1, roundStatus: 'river' }) }),
                playerMap: {
                    player_0: mockPlayer({ id: 'player_0', stack: 10000 }),
                    player_1: mockPlayer({ id: 'player_1', stack: 0 }),
                },
            };

            tableStateManagerService.getTableById.mockResolvedValue(table);

            await service.endRound(table);

            expect(turnTimeService.onEnd).toHaveBeenCalledWith({
                tableId: table.id,
                finalPlayerId: table.seatMap[1],
            });

            expect(winnerDeterminerService.determineWinner).toHaveBeenCalledWith(
                table.id,
                table.playerMap,
                table.activeRound,
            );

            expect(tableStateManagerService.updateTable).toHaveBeenCalledWith(table.id, {
                status: 'ended',
            });

            expect(tableGatewayService.emitTableEvent).toHaveBeenCalledWith(table.id, {
                type: 'tableStatusChanged',
                status: 'ended',
                startDate: undefined,
            });
        });

        it('should stop player timer, call winner determiner, and start new round if two or more players still have chips', async () => {
            tableStateManagerService.getTableById.mockResolvedValue(table);
            deckManagerService.buildDeck.mockResolvedValue(deck);
            deckManagerService.drawCard.mockResolvedValue({ card, deck });

            await service.endRound(table);

            expect(turnTimeService.onEnd).toHaveBeenCalledWith({
                tableId: table.id,
                finalPlayerId: table.seatMap[1],
            });

            expect(winnerDeterminerService.determineWinner).toHaveBeenCalledWith(
                table.id,
                table.playerMap,
                table.activeRound,
            );

            expect(tableStateManagerService.updateRound).toHaveBeenCalledWith(table.id, {
                turnCount: 0,
                roundStatus: 'deal',
                pot: 0,
                toCall: 0,
                cards: [],
                dealerSeat: 1,
                activeSeat: 2,
            });

            expect(tableGatewayService.emitTableEvent).toHaveBeenCalledWith(table.id, {
                type: 'roundChanged',
                roundStatus: 'deal',
                activeSeat: 1,
                cards: [],
                toCall: 10,
                pot: 15,
            });
        });
    });
});
