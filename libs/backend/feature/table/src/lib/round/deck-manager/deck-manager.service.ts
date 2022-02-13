import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Card, Rank } from '@poker-moons/shared/type';
import { generateRandomNumber } from './util/rng';

@Injectable()
export class DeckManagerService {
    /**
     * Randomly draws a card from the deck
     *
     * @param tableId - the ID of the table the deck is associated with
     * @param deck - the deck to draw the card from
     *
     * @throws {InternalServerErrorException} if the random number generated is outside
     *
     * @returns the drawn card (which can then be added to the cards on the round or a player's cards)
     */
    drawCard(tableId: string, deck: Card[]): Card {
        const randomNumber = generateRandomNumber(deck.length);

        const card = deck[randomNumber];

        if (!card) {
            throw new InternalServerErrorException('The random number generated does not match an index in the deck.');
        }

        // Remove the selected card from the deck
        deck.splice(randomNumber, 1);

        // TODO: update the table's deck in the server state

        return card;
    }

    /**
     * Should be called at the start of each round to build a new deck for the table
     *
     * @param tableId - the table to build the deck for
     */
    buildDeck(tableId: string): Card[] {
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

        // TODO: update the table's deck in the server state

        return deck;
    }
}
