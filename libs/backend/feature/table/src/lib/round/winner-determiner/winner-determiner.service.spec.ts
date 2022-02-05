import { TableId } from '@poker-moons/shared/type';
import { WinnerDeterminerService } from './winner-determiner.service';
import { mockCard, mockPlayer, mockRound } from '@poker-moons/shared/testing';
import { createTestingModuleFactory, SpyObject } from '@trellisorg/nest-spectator';
import { TableGatewayService } from '../../shared/websocket/table-gateway.service';
import { PotManagerService } from '../pot-manager/pot-manager.service';
import { BadRequestException } from '@nestjs/common';
import { playerMissingCards, roundMissingCards } from './winner-determiner.copy';

describe('WinnerDeterminerService', () => {
    let service: WinnerDeterminerService;

    let tableGatewayService: SpyObject<TableGatewayService>;
    let potManagerService: SpyObject<PotManagerService>;

    beforeEach(async () => {
        const module = await createTestingModuleFactory({
            providers: [WinnerDeterminerService],
            mocks: [TableGatewayService, PotManagerService],
        }).compile();

        service = module.get<WinnerDeterminerService>(WinnerDeterminerService);

        tableGatewayService = module.get(TableGatewayService);
        potManagerService = module.get(PotManagerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    const tableId: TableId = 'table_1';

    const round = mockRound({
        pot: 1000,
        cards: [
            mockCard({ suit: 'clubs', rank: '10' }),
            mockCard({ suit: 'diamonds', rank: '10' }),
            mockCard({ suit: 'hearts', rank: '10' }),
            mockCard({ suit: 'spades', rank: '7' }),
            mockCard({ suit: 'clubs', rank: '5' }),
        ],
    });

    const player1 = mockPlayer({
        id: 'player_1',
        username: 'Levi',
        cards: [mockCard({ suit: 'clubs', rank: '2' }), mockCard({ suit: 'hearts', rank: '3' })],
        called: 200,
    });

    const player2 = mockPlayer({
        id: 'player_2',
        username: 'Bob',
        cards: [mockCard({ suit: 'spades', rank: '2' }), mockCard({ suit: 'hearts', rank: '8' })],
        called: 200,
    });

    const player3 = mockPlayer({
        id: 'player_3',
        username: 'Joe',
        cards: [mockCard({ suit: 'spades', rank: '10' }), mockCard({ suit: 'hearts', rank: '5' })],
        called: 200,
    });

    const player4 = mockPlayer({
        id: 'player_4',
        username: 'Sam',
        cards: [mockCard({ suit: 'spades', rank: '9' }), mockCard({ suit: 'hearts', rank: '5' })],
        called: 500,
    });

    const player5 = mockPlayer({
        id: 'player_5',
        username: 'Smith',
        cards: [mockCard({ suit: 'spades', rank: '14' }), mockCard({ suit: 'hearts', rank: '14' })],
        called: 500,
    });

    describe('determineWinner', () => {
        it('should emit single winner', async () => {
            potManagerService.buildPot.mockReturnValueOnce(400).mockReturnValue(0);
            potManagerService.splitPot.mockReturnValueOnce(200);

            await service.determineWinner(tableId, [player1, player3], round);

            expect(tableGatewayService.emitTableEvent).toHaveBeenCalledWith(tableId, {
                type: 'winner',
                winners: {
                    [player3.id]: {
                        amountWon: 200,
                        cards: player3.cards,
                        displayText: `${player3.username} won $200.00 with a four of a kind`,
                    },
                },
            });
        });

        it('should emit multiple winners if there is a tie', async () => {
            potManagerService.buildPot.mockReturnValueOnce(400).mockReturnValue(0);
            potManagerService.splitPot.mockReturnValue(200);

            await service.determineWinner(tableId, [player1, player2], round);

            expect(tableGatewayService.emitTableEvent).toHaveBeenCalledWith(tableId, {
                type: 'winner',
                winners: {
                    [player1.id]: {
                        amountWon: 200,
                        cards: player1.cards,
                        displayText: `${player1.username} won $200.00 with a three of a kind`,
                    },
                    [player2.id]: {
                        amountWon: 200,
                        cards: player2.cards,
                        displayText: `${player2.username} won $200.00 with a three of a kind`,
                    },
                },
            });
        });

        it('should emit multiple winners with varying amounts won if side pots have formed', async () => {
            potManagerService.buildPot.mockReturnValueOnce(1600).mockReturnValueOnce(600).mockReturnValue(0);
            potManagerService.splitPot.mockReturnValueOnce(1000).mockReturnValueOnce(600);

            await service.determineWinner(tableId, [player1, player2, player3, player4, player5], round);

            expect(tableGatewayService.emitTableEvent).toHaveBeenCalledWith(tableId, {
                type: 'winner',
                winners: {
                    [player3.id]: {
                        amountWon: 1000,
                        cards: player3.cards,
                        displayText: `${player3.username} won $1,000.00 with a four of a kind`,
                    },
                    [player5.id]: {
                        amountWon: 600,
                        cards: player5.cards,
                        displayText: `${player5.username} won $600.00 with a full house`,
                    },
                },
            });
        });

        it('should throw bad request exception if the table does not have 5 cards', async () => {
            const invalidRound = mockRound({ pot: 1000, cards: [mockCard({ suit: 'clubs', rank: '10' })] });

            await expect(service.determineWinner(tableId, [player1, player2], invalidRound)).rejects.toThrow(
                new BadRequestException(roundMissingCards),
            );
        });

        it('should throw bad request exception if any player does not have 2 cards', async () => {
            const invalidPlayer = mockPlayer({
                id: 'player_1',
                username: 'Levi',
                cards: [mockCard({ suit: 'clubs', rank: '2' })],
            });

            await expect(service.determineWinner(tableId, [invalidPlayer], round)).rejects.toThrow(
                new BadRequestException(playerMissingCards(invalidPlayer.id)),
            );
        });
    });
});
