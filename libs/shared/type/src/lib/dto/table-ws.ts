import type { Card } from '../card';
import type { PlayerId, PlayerStatus, PublicPlayer, WinnerMap } from '../player';
import type { RoundStatus } from '../round';
import type { ClientTableState } from '../state';
import type { SeatId, TableStatus } from '../table';

export const TABLE_NAMESPACE = 'table' as const;

interface GeneralTableEvent<Type> {
    type: Type;
}

export interface ConnectedEvent extends GeneralTableEvent<'connected'> {
    state: Omit<ClientTableState, 'playerId'>;
}

export interface PlayerJoinedTableEvent extends GeneralTableEvent<'playerJoined'> {
    seatId: SeatId;
    player: PublicPlayer;
}

export interface PlayerLeftTableEvent extends GeneralTableEvent<'playerLeft'> {
    seatId: SeatId;
}

/**
 * @description Event that occurs when a player runs past their 30 second timeout and start using their
 *              time bank. Update the time bank for the client.
 *
 *              if `timeBank` is not zero, this event is just meant to update the timeBank of the player on the frontend.
 *              However if it is zero, that means the player completely timed out.
 */
export interface PlayerTimeBankEvent extends GeneralTableEvent<'playerTimeBank'> {
    playerId: PlayerId;

    timeBank: number;
}

export interface RoundStatusChangedEvent extends GeneralTableEvent<'roundStatusChanged'> {
    status: RoundStatus;

    cards: Card[];
}

export interface TableStatusChangedEvent extends GeneralTableEvent<'tableStatusChanged'> {
    status: TableStatus;

    /**
     * Updating the start date of the table.
     *
     * `Date`: Applying a new date
     * `null`: Removing a redacted date
     * `undefined`: leave date as is
     */
    startDate: Date | null | undefined;
}

export interface PlayerTurnEvent extends GeneralTableEvent<'turn'> {
    /**
     * This amount will be added to the `round.pot`, `player.called`, and subtracted from the `player.stack`.
     * And calculate new `toCall` amount.
     *
     * - In the case of `fold` or `check` value is just zero
     */
    bidAmount: number;

    /**
     * The status the player who made the action will be at
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
     * A map of winning player IDs to the amount they won, their cards, and text that indicates the hand they won with
     *
     * Cases where there could be multiple winners:
     * - Multiple players have the same hand and have to split the pot equally
     * - Side pots are introduced and in addition to the main winner there are winners of the side pots
     */
    winners: WinnerMap;
}

export type TableEvent =
    | ConnectedEvent
    | PlayerJoinedTableEvent
    | PlayerLeftTableEvent
    | PlayerTimeBankEvent
    | RoundStatusChangedEvent
    | TableStatusChangedEvent
    | PlayerTurnEvent
    | WinnerWinnerChickenDinnerEvent;
