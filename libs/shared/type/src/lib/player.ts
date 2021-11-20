import { StrictOmit } from 'ts-essentials';
import { SeatId } from '..';
import { Card } from './card';

export type PlayerId = `player_${string}`;

export const playerStatus = ['waiting', 'checked', 'called', 'folded', 'raised', 'all-in'] as const;

/**
 * - `waiting`: Awaiting action of player
 * - `checked`: Played has checked
 * - `called`: Player has called the current bet
 * - `folded`: Player has folded out of the round
 * - `raised`: Player has raised the current bet
 * - `all-in`: Player has leveraged there stack in the current bet
 */
export type PlayerStatus = typeof playerStatus[number];

export interface Player {
    id: PlayerId;

    /**
     * Nickname deciphering the game
     */
    username: string;

    /**
     * The random profile image for player
     */
    img: string;

    /**
     * The sum of chips remaining on the player.
     * - Does not contain the amount of chips in play
     */
    stack: number;

    // * Active Round Fields
    /**
     * The active status of the player in the current round
     */
    status: PlayerStatus;

    /**
     * The amount the user has bet in the current round
     */
    called: number;

    /**
     * The seat the player is sitting in. If they left, then this will be `null`
     */
    seatId: SeatId | null;

    /**
     * Cards the player has in the active round
     */
    cards: [Card, Card] | [];
}

export type PublicPlayer = StrictOmit<Player, 'cards'>;
