import { BadRequestException } from '@nestjs/common';
import { mockCard, mockPlayer, mockRound } from '@poker-moons/shared/testing';
import { TableId } from '@poker-moons/shared/type';
import { createTestingModuleFactory, SpyObject } from '@trellisorg/nest-spectator';
import { TableGatewayService } from '../../shared/websocket/table-gateway.service';
import { TableStateManagerService } from '../../table-state-manager/table-state-manager.service';
import { PotManagerService } from '../pot-manager/pot-manager.service';
import { playerMissingCards } from './winner-determiner.copy';
import { WinnerDeterminerService } from './winner-determiner.service';

describe('WinnerDeterminerService', () => {
    let service: WinnerDeterminerService;

    let tableGatewayService: SpyObject<TableGatewayService>;
    let tableStateManagerService: SpyObject<TableStateManagerService>;
    let potManagerService: SpyObject<PotManagerService>;

    beforeEach(async () => {
        const module = await createTestingModuleFactory({
            providers: [WinnerDeterminerService],
            mocks: [TableGatewayService, TableStateManagerService, PotManagerService],
        }).compile();

        service = module.get<WinnerDeterminerService>(WinnerDeterminerService);

        tableGatewayService = module.get(TableGatewayService);
        tableStateManagerService = module.get(TableStateManagerService);
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
        roundCalled: 200,
    });

    const player2 = mockPlayer({
        id: 'player_2',
        username: 'Bob',
        cards: [mockCard({ suit: 'spades', rank: '2' }), mockCard({ suit: 'hearts', rank: '8' })],
        roundCalled: 200,
    });

    const player3 = mockPlayer({
        id: 'player_3',
        username: 'Joe',
        cards: [mockCard({ suit: 'spades', rank: '10' }), mockCard({ suit: 'hearts', rank: '5' })],
        roundCalled: 200,
    });

    const player4 = mockPlayer({
        id: 'player_4',
        username: 'Sam',
        cards: [mockCard({ suit: 'spades', rank: '9' }), mockCard({ suit: 'hearts', rank: '5' })],
        roundCalled: 500,
    });

    const player5 = mockPlayer({
        id: 'player_5',
        username: 'Smith',
        cards: [mockCard({ suit: 'spades', rank: '14' }), mockCard({ suit: 'hearts', rank: '14' })],
        roundCalled: 500,
    });

    describe('determineWinner', () => {
        it('should emit single winner and update their stack in the state', async () => {
            potManagerService.buildPot.mockReturnValueOnce(400).mockReturnValueOnce(0);
            potManagerService.splitPot.mockReturnValueOnce(200).mockReturnValueOnce(200);

            await service.determineWinner(tableId, { [player1.id]: player1, [player3.id]: player3 }, round);

            expect(tableStateManagerService.updateTablePlayer).toHaveBeenCalledWith(tableId, player3.id, {
                stack: player3.stack + 200,
            });

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
            potManagerService.buildPot.mockReturnValueOnce(400).mockReturnValueOnce(0);
            potManagerService.splitPot.mockReturnValueOnce(200).mockReturnValueOnce(200);

            await service.determineWinner(
                tableId,
                { [player1.id]: { ...player1, roundCalled: 200 }, [player2.id]: player2 },
                round,
            );

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
            potManagerService.buildPot.mockReturnValueOnce(1600).mockReturnValueOnce(600).mockReturnValueOnce(0);
            potManagerService.splitPot.mockReturnValueOnce(1000).mockReturnValueOnce(600);

            await service.determineWinner(
                tableId,
                {
                    [player1.id]: { ...player1, roundCalled: 200 },
                    [player2.id]: { ...player2, roundCalled: 200 },
                    [player3.id]: { ...player3, roundCalled: 200 },
                    [player4.id]: player4,
                    [player5.id]: player5,
                },
                round,
            );

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

        it('should throw bad request exception if any player does not have 2 cards', async () => {
            const invalidPlayer = mockPlayer({
                id: 'player_1',
                username: 'Levi',
                cards: [mockCard({ suit: 'clubs', rank: '2' })],
            });

            await expect(
                service.determineWinner(tableId, { [invalidPlayer.id]: invalidPlayer }, round),
            ).rejects.toThrow(new BadRequestException(playerMissingCards(invalidPlayer.id)));
        });
    });
});
