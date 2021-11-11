import { Card } from "./card";

export type PlayerId = `player_${string}`;

/**
 * - `waiting`: Awaiting action of player
 * - `call`: Player has called the current bet
 * - `folded`: Player has folded out of the round
 * - `raised`: Player has raised the current bet
 * - `all-in`: Player has leveraged there stack in the current bet
 */
export type PlayerStatus = "waiting" | "called" | "folded" | "raised" | "all-in";

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
     * Cards the player has in the active round
     */
    cards: Card[];
}
