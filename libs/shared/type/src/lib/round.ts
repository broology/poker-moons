import { Card } from './card';
import { PlayerId } from './player';

export interface Round {
    /**
     * The total pot amount for the round
     */
    pot: number;

    /**
     * The amount that is required for the players to have `called`
     */
    toCall: number;

    /**
     * Increments each time a turn is passed to another player
     */
    turnCount: number;

    /**
     * The ID the active players turn
     */
    activePlayer: PlayerId;

    /**
     * The index of the dealer in the player array
     * - Small blind: (dealerIndex + 1) % # of players
     * - Big blind: (dealerIndex + 2) % # of players
     */
    dealerIndex: number;

    /**
     * The small blind during the round.
     * - Big blind: smallBlind * 2
     */
    smallBlind: number;

    /**
     * The cards in the round on the table
     * - Flop: first three
     * - Turn: fourth card
     * - River: fifth card
     */
    cards: Card[];
}
