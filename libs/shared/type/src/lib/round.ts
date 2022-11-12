import type { Card } from './card';
import type { SeatId } from './table';

export const roundStatus = ['deal', 'flop', 'turn', 'river'] as const;
export type RoundStatus = typeof roundStatus[number];

export interface Round {
    /**
     * @description The total pot amount for the round.
     */
    pot: number;

    /**
     * @description The amount that is required for the players to have `called`
     */
    toCall: number;

    /**
     * @description The amount of raised in the last bidding cycle.
     *
     * @defaults To the big blind value.
     */
    previousRaise: number;

    /**
     * @description Increments each time a turn is passed to another player Resets every time the round status changes.
     */
    turnCount: number;

    /**
     * @description The state of the round.
     */
    roundStatus: RoundStatus;

    /**
     * @description The ID the active players turn.
     */
    activeSeat: SeatId | null;

    /**
     * @description The seat of the dealer in the player array.
     *
     * - Small blind: (dealerSeat + 1) % # of players.
     * - Big blind: (dealerSeat + 2) % # of players.
     */
    dealerSeat: SeatId;

    /**
     * @description The small blind during the round.
     *
     * - Big blind: smallBlind * 2.
     */
    smallBlind: number;

    /**
     * @description The cards in the round on the table.
     *
     * - Flop: first three.
     * - Turn: fourth card.
     * - River: fifth card.
     */
    cards: Card[];
}
