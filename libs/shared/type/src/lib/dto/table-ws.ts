import type { Card } from '../card';
import type { PlayerId, PlayerStatus, PublicPlayer } from '../player';
import type { RoundStatus } from '../round';
import type { SharedTableState } from '../state';
import type { SeatId } from '../table';

export const TABLE_NAMESPACE = 'table' as const;

interface GeneralTableEvent<Type> {
    type: Type;
}

export interface ConnectedEvent extends GeneralTableEvent<'connected'> {
    state: SharedTableState;
}

export interface PlayerJoinedTableEvent extends GeneralTableEvent<'playerJoined'> {
    seatId: SeatId;
    player: PublicPlayer;
}

export interface PlayerLeftTableEvent extends GeneralTableEvent<'playerLeft'> {
    seatId: SeatId;
}

export interface RoundStatusChangedEvent extends GeneralTableEvent<'roundStatusChanged'> {
    status: RoundStatus;

    cards: Card[];
}

export interface PlayerTurnEvent extends GeneralTableEvent<'turn'> {
    /**
     * This amount will be added to the `round.pot`, `player.called`, and subtracted from the `player.stack`.
     * And calculate new `toCall` amount.
     *
     * - In the case of `fold` or `check` value is just hero
     */
    bidAmount: number;

    /**
     * The status the player who made bid will be at
     */
    newStatus: PlayerStatus;

    /**
     * The player who performed this action
     */
    playerId: PlayerId;

    /**
     * The new active seat after this turn
     */
    newActiveSeatId: SeatId;
}

export interface WinnerWinnerChickenDinnerEvent extends GeneralTableEvent<'winner'> {
    /**
     * @example "Jimmy won with a full house"
     */
    displayText: string;

    /**
     * The amount the winner(s) will receive
     * 
     * Note: If there are multiple winners the pot amount emitted will have already been 
     * divided equally, so this will be the amount each winner will receive
     */
    pot: number;

    /**
     * The winning player ID(s)
     */
    playerIds: PlayerId[];
}

export type TableEvent =
    | ConnectedEvent
    | PlayerJoinedTableEvent
    | PlayerLeftTableEvent
    | RoundStatusChangedEvent
    | PlayerTurnEvent
    | WinnerWinnerChickenDinnerEvent;
