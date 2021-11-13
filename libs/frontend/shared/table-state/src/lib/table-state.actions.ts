import { createAction, props } from '@ngrx/store';
import {
    GetPlayerCardsResponse,
    PerformPlayerActionResponse,
    PlayerJoinedTableEvent,
    PlayerLeftTableEvent,
    PlayerTurnEvent,
    PokerMoonsError,
    RoundStatusChangedEvent,
    SharedTableState,
    WinnerWinnerChickenDinnerEvent,
} from '@poker-moons/shared/type';
import { buildAsyncRequestActions, generateActionName } from './util/action-util';

/**
 * Action performed when the table state is initialized
 */
export const initialize = createAction(generateActionName('Initialize the table'));

/* On `initialize` attempt to connect to websocket */
export const [requestWsConnection, wsConnectionSuccessful, wsConnectionFailed] = buildAsyncRequestActions<
    SharedTableState,
    PokerMoonsError
>('connect to table websocket');

/* The private way for the user to request the cards themselves once the round starts */
export const [requestPlayerCards, playerCardsSuccessful, playerCardsFailed] = buildAsyncRequestActions<
    GetPlayerCardsResponse,
    PokerMoonsError
>('get player cards');

/* Actions used when the client player attempts to perform an action  */
export const [requestPlayerAction, playerActionSuccessful, playerActionFailed] = buildAsyncRequestActions<
    PerformPlayerActionResponse,
    PokerMoonsError
>('perform player action');

/* Websocket actions that are pushed to the client */
export const wsPlayerJoined = createAction(
    generateActionName('Player has joined the table'),
    props<{ payload: PlayerJoinedTableEvent }>(),
);
export const wsPlayerLeft = createAction(
    generateActionName('Player has left the table'),
    props<{ payload: PlayerLeftTableEvent }>(),
);
export const wsRoundStatusChanged = createAction(
    generateActionName('The round status has changed'),
    props<{ payload: RoundStatusChangedEvent }>(),
);
export const wsPlayerTurn = createAction(
    generateActionName('A Player has completed their turn'),
    props<{ payload: PlayerTurnEvent }>(),
);
export const wsWinnerWinnerChickenDinner = createAction(
    generateActionName('Winner of round has been declared'),
    props<{ payload: WinnerWinnerChickenDinnerEvent }>(),
);
