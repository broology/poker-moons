import { createAction } from '@ngrx/store';
import {
    GetPlayerCardsResponse,
    PerformPlayerActionResponse,
    PokerMoonsError,
    SharedTableState,
} from '@poker-moons/shared/type';
import { buildAsyncRequestActions, generateActionName } from './util/action-util';

/**
 * Action performed when the table state is initialized
 */
export const initialize = createAction(generateActionName('Initialize the table'));

/**
 * On `initialize` attempt to connect to websocket
 */
export const [requestWsConnection, wsConnectionSuccessful, wsConnectionFailed] = buildAsyncRequestActions<
    SharedTableState,
    PokerMoonsError
>('connect to table websocket');

export const [requestPlayerCards, playerCardsSuccessful, PlayerCardsFailed] = buildAsyncRequestActions<
    GetPlayerCardsResponse,
    PokerMoonsError
>('get player cards');

export const [requestPlayerAction, playerActionSuccessful, playerActionFailed] = buildAsyncRequestActions<
    PerformPlayerActionResponse,
    PokerMoonsError
>('perform player action');
