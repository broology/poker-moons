import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Card, Rank, TableId } from '@poker-moons/shared/type';
import { TableStateManagerService } from '../../table-state-manager/table-state-manager.service';
import { generateRandomNumber } from './util/rng';

@Injectable()
export class DeckManagerService {
    constructor(private readonly tableStateManagerService: TableStateManagerService) {}

    /**
     * Randomly draws a card from the deck
     *
     * @param tableId - the ID of the table the deck is associated with
     * @param deck - the deck to draw the card from
     *
     * @throws {InternalServerErrorException} if the random number generated is outside
     *
     * @returns the drawn card and the updated deck
     */
    async drawCard(tableId: TableId, deck: Card[]): Promise<{ card: Card; deck: Card[] }> {
        const randomNumber = generateRandomNumber(deck.length);

        const card = deck[randomNumber];

        if (!card) {
            throw new InternalServerErrorException('The random number generated does not match an index in the deck.');
        }

        // Remove the selected card from the deck
        deck.splice(randomNumber, 1);

        // Update the table's deck in the server state
        await this.tableStateManagerService.updateTable(tableId, { deck });

        return { card, deck };
    }

    /**
     * Should be called at the start of each round to build a new deck for the table
     *
     * @param tableId - the table to build the deck for
     *
     * @returns the deck
     */
    async buildDeck(tableId: TableId): Promise<Card[]> {
        const deck: Card[] = [];

        // We draw from the deck randomly, so it doesn't need to be shuffled
        for (let x = 2; x <= 14; x += 1) {
            deck.push(
                { suit: 'clubs', rank: x.toString() as Rank },
                { suit: 'diamonds', rank: x.toString() as Rank },
                { suit: 'hearts', rank: x.toString() as Rank },
                { suit: 'spades', rank: x.toString() as Rank },
            );
        }

        // Update the table's deck in the server state
        await this.tableStateManagerService.updateTable(tableId, { deck });

        return deck;
    }
}
