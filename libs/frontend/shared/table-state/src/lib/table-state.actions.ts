import { createAction, props } from '@ngrx/store';
import {
    ConnectedEvent,
    GetPlayerCardsResponse,
    PerformPlayerActionRequest,
    PerformPlayerActionResponse,
    PokerMoonsError,
    TableEvent,
    TableId,
} from '@poker-moons/shared/type';
import { ActionType, buildAsyncRequestActions, createActionTyped, generateActionName } from './shared/util/action-util';

/**
 * Action performed when the table state is initialized
 */
export const initialize = createAction(generateActionName('Initialize the table'), props<{ tableId: TableId }>());

/* On `initialize` attempt to connect to websocket */
export const connectToWs = buildAsyncRequestActions<{ tableId: TableId }, ConnectedEvent, PokerMoonsError>(
    'connect to table websocket',
);

/* The private way for the user to request the cards themselves once the round starts */
export const playerGetCards = buildAsyncRequestActions<undefined, GetPlayerCardsResponse, PokerMoonsError>(
    'get player cards',
);

/* Actions used when the client player attempts to perform an action  */
export const playerAction = buildAsyncRequestActions<
    PerformPlayerActionRequest,
    PerformPlayerActionResponse,
    PokerMoonsError
>('perform player action');

/* Websocket actions that are pushed to the client */
export type TableWsActionMap = {
    [type in Exclude<TableEvent['type'], 'connected'>]: ActionType<Extract<TableEvent, { type: type }>>;
};

export const tableWsActionMap: TableWsActionMap = {
    playerJoined: createActionTyped('player has joined the table'),
    playerLeft: createActionTyped('player has left the table'),
    roundStatusChanged: createActionTyped('round status has changed'),
    turn: createActionTyped('player turn has occurred'),
    winner: createActionTyped('winner has been decided'),
};
