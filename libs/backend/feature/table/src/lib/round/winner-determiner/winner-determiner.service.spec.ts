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
            mockCard({ suit: 'spades', rank: '10' }),
            mockCard({ suit: 'clubs', rank: '5' }),
        ],
    });
    const player1 = mockPlayer({
        id: 'player_1',
        username: 'Levi',
        cards: [mockCard({ suit: 'clubs', rank: '2' }), mockCard({ suit: 'hearts', rank: '3' })],
    });
    const player2 = mockPlayer({
        id: 'player_2',
        username: 'Bob',
        cards: [mockCard({ suit: 'spades', rank: '2' }), mockCard({ suit: 'hearts', rank: '5' })],
    });

    describe('determineWinner', () => {
        it('should emit single winner', async () => {
            await service.determineWinner(tableId, [player1], round);

            expect(tableGatewayService.emitTableEvent).toHaveBeenCalledWith(tableId, {
                type: 'winner',
                playerIds: [player1.id],
                pot: round.pot,
                displayText: `${player1.username} won with a four of a kind`,
            });
        });

        it('should emit multiple winners if there is a tie', async () => {
            potManagerService.splitPot.mockReturnValueOnce({ amountToDistribute: 500, amountLeftover: 0 });

            await service.determineWinner(tableId, [player1, player2], round);

            expect(tableGatewayService.emitTableEvent).toHaveBeenCalledWith(tableId, {
                type: 'winner',
                playerIds: [player1.id, player2.id],
                pot: round.pot / 2,
                displayText: `${player1.username} and ${player2.username} won with a four of a kind`,
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
