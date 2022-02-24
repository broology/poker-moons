import { InternalServerErrorException } from '@nestjs/common';
import { DeckManagerService } from './deck-manager.service';
import { createTestingModuleFactory, SpyObject } from '@trellisorg/nest-spectator';
import { TableStateManagerService } from '../../table-state-manager/table-state-manager.service';

describe('DeckManagerService', () => {
    let service: DeckManagerService;

    let tableStateManagerService: SpyObject<TableStateManagerService>;

    beforeEach(async () => {
        const module = await createTestingModuleFactory({
            providers: [DeckManagerService],
            mocks: [TableStateManagerService],
        }).compile();

        service = module.get<DeckManagerService>(DeckManagerService);

        tableStateManagerService = module.get(TableStateManagerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('drawCard', () => {
        it('should draw a random card from the deck', async () => {
            const deck = await service.buildDeck('table_1');

            const result = await service.drawCard('table_1', deck);

            expect(result).toEqual({
                suit: expect.stringMatching('^clubs$|^spades$|^diamonds$|^hearts$'),
                rank: expect.stringMatching('^2$|^3$|^4$|^5$|^6$|^7$|^8$|^9$|^10$|^11$|^12$|^13$|^14$'),
            });
        });

        it('should update the deck for the table in the server state', async () => {
            const deck = await service.buildDeck('table_1');

            await service.drawCard('table_1', deck);

            expect(tableStateManagerService.updateTable).toHaveBeenCalled();
        });

        it('should throw InternalServerErrorException if the random number generated does not match an index in the deck', async () => {
            await expect(() => service.drawCard('table_1', [])).rejects.toThrow(
                new InternalServerErrorException('The random number generated does not match an index in the deck.'),
            );
        });
    });

    describe('buildDeck', () => {
        it('should return the deck', async () => {
            const result = await service.buildDeck('table_1');

            expect(result).toEqual([
                { rank: '2', suit: 'clubs' },
                { rank: '2', suit: 'diamonds' },
                { rank: '2', suit: 'hearts' },
                { rank: '2', suit: 'spades' },
                { rank: '3', suit: 'clubs' },
                { rank: '3', suit: 'diamonds' },
                { rank: '3', suit: 'hearts' },
                { rank: '3', suit: 'spades' },
                { rank: '4', suit: 'clubs' },
                { rank: '4', suit: 'diamonds' },
                { rank: '4', suit: 'hearts' },
                { rank: '4', suit: 'spades' },
                { rank: '5', suit: 'clubs' },
                { rank: '5', suit: 'diamonds' },
                { rank: '5', suit: 'hearts' },
                { rank: '5', suit: 'spades' },
                { rank: '6', suit: 'clubs' },
                { rank: '6', suit: 'diamonds' },
                { rank: '6', suit: 'hearts' },
                { rank: '6', suit: 'spades' },
                { rank: '7', suit: 'clubs' },
                { rank: '7', suit: 'diamonds' },
                { rank: '7', suit: 'hearts' },
                { rank: '7', suit: 'spades' },
                { rank: '8', suit: 'clubs' },
                { rank: '8', suit: 'diamonds' },
                { rank: '8', suit: 'hearts' },
                { rank: '8', suit: 'spades' },
                { rank: '9', suit: 'clubs' },
                { rank: '9', suit: 'diamonds' },
                { rank: '9', suit: 'hearts' },
                { rank: '9', suit: 'spades' },
                { rank: '10', suit: 'clubs' },
                { rank: '10', suit: 'diamonds' },
                { rank: '10', suit: 'hearts' },
                { rank: '10', suit: 'spades' },
                { rank: '11', suit: 'clubs' },
                { rank: '11', suit: 'diamonds' },
                { rank: '11', suit: 'hearts' },
                { rank: '11', suit: 'spades' },
                { rank: '12', suit: 'clubs' },
                { rank: '12', suit: 'diamonds' },
                { rank: '12', suit: 'hearts' },
                { rank: '12', suit: 'spades' },
                { rank: '13', suit: 'clubs' },
                { rank: '13', suit: 'diamonds' },
                { rank: '13', suit: 'hearts' },
                { rank: '13', suit: 'spades' },
                { rank: '14', suit: 'clubs' },
                { rank: '14', suit: 'diamonds' },
                { rank: '14', suit: 'hearts' },
                { rank: '14', suit: 'spades' },
            ]);
        });
    });

    it('should update the deck for the table in the server state', async () => {
        const deck = await service.buildDeck('table_1');

        expect(tableStateManagerService.updateTable).toHaveBeenCalledWith('table_1', { deck });
    });
});
