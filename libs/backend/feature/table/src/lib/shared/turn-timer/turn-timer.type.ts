import { PlayerId, TableId } from '@poker-moons/shared/type';

/**
 * @description Data to be stored in a `bull` queue for the turn timer queue job
 */
export interface TurnTimerQueueJobData {
    /**
     * id of the table this turn timer applies too
     */
    tableId: TableId;

    /**
     * id of the active player at the table
     */
    playerId: PlayerId;

    /**
     * Date of which the timer was started
     */
    startDate: Date;
}

/**
 * @description Arguments passed into the `TurnTimerService` when a table round is started.
 */
export interface OnStartArgs {
    /**
     * id of the table that started
     */
    tableId: TableId;

    /**
     * id of player that is the first active player
     */
    startingPlayerId: PlayerId;
}

/**
 * @description Arguments passed into the `TurnTimerService` when a turn occurs at the table.
 */
export interface OnTurnArgs {
    /**
     * id of table turn is occurring on
     */
    tableId: TableId;

    /**
     * id of player of the active player, who's turn has ended
     */
    currentPlayerId: PlayerId;

    /**
     * id of the player who is after the `currentPlayerId`, who is about to start
     */
    nextPlayerId: PlayerId;
}

/**
 * @description Arguments passed into the `TurnTimerService` when a table round is ended.
 */
export interface OnEndArgs {
    /**
     * id of the table that started
     */
    tableId: TableId;

    /**
     * id of player that took the last turn
     */
    finalPlayerId: PlayerId;
}
