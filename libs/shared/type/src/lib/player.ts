import { StrictOmit } from 'ts-essentials';
import { Card } from './card';
import { SeatId } from './table';

export type PlayerId = `player_${string}`;

export const PLAYER_PREFIX = 'player' as const;
export const playerStatus = ['waiting', 'checked', 'called', 'folded', 'raised', 'all-in', 'out'] as const;

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
     * Whether the player is ready to play or not.
     */
    ready: boolean;

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

    /**
     * Amount of time remaining in the players time bank
     *
     * @unit seconds
     */
    timeBank: number;
}

export interface PublicPlayer extends StrictOmit<Player, 'cards'> {
    /**
     * The cards of the player, If they have cards but they should be private then will be `[null, null]`
     */
    cards: Player['cards'] | [null, null];
}
/*
 * We've split Player into `MutablePlayer` and `ImmutablePlayer`
 * so that on the frontend we do a significant smaller amount of rerenders.
 * As, updating `MutablePlayer` will only update components that depend on it
 */

/**
 * Data on the player that is to be frequently updated during the game
 */
export type MutablePublicPlayer = Pick<PublicPlayer, 'stack' | 'status' | 'called' | 'cards' | 'ready' | 'timeBank'>;

/**
 * Data on the player that will stay the same during the game (mostly)
 */
export type ImmutablePublicPlayer = StrictOmit<PublicPlayer, keyof MutablePublicPlayer>;

/**
 * A map of winning player IDs to the amount they won, their cards, and text that indicates the hand they won with
 */
export type WinnerMap = Record<PlayerId, { amountWon: number; cards: [Card, Card]; displayText: string }>;
