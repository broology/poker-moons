import { ConnectedEvent, PokerMoonsError, TableEvent, TableId } from '@poker-moons/shared/type';
import { ActionType, buildAsyncRequestActions, createActionType } from '../shared/util/action-util';

/**
 * On `initialize` attempt to connect to websocket
 */
export const connectToWs = buildAsyncRequestActions<{ tableId: TableId }, ConnectedEvent, PokerMoonsError>(
    'connect to table websocket',
);

/**
 * Type map to enforce that all websocket events are handled on the frontend.
 */
export type TableWsActionMap = {
    [type in Exclude<TableEvent['type'], 'connected'>]: ActionType<Extract<TableEvent, { type: type }>>;
};

/**
 * Websocket actions that are pushed to the client
 */
export const tableWsActionMap: TableWsActionMap = {
    playerJoined: createActionType('player has joined the table'),
    playerLeft: createActionType('player has left the table'),
    playerReadyStatus: createActionType('player ready status has changed'),
    playerTimeBank: createActionType('player has passed timeout period, and their time bank has been affected'),
    roundStatusChanged: createActionType('round status has changed'),
    tableStatusChanged: createActionType('table status has been changed'),
    turn: createActionType('player turn has occurred'),
    winner: createActionType('winner has been decided'),
};
