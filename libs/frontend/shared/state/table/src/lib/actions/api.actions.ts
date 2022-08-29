import {
    GetPlayerCardsResponse,
    JoinTableRequest,
    JoinTableResponse,
    LeaveTableResponse,
    PerformPlayerActionRequest,
    PerformPlayerActionResponse,
    PlayerId,
    PokerMoonsError,
} from '@poker-moons/shared/type';
import { buildAsyncRequestActions } from '../shared/util/action-util';

/**
 * @description The private way for the user to request the cards themselves once the round starts.
 */
export const getCards = buildAsyncRequestActions<
    undefined,
    { playerId: PlayerId; cards: GetPlayerCardsResponse },
    PokerMoonsError
>('get player cards');

/**
 * @description The player joins the poker table.
 */
export const joinTable = buildAsyncRequestActions<JoinTableRequest, JoinTableResponse, PokerMoonsError>(
    'join the table',
);

/**
 * @description The player leaves the poker table.
 */
export const leaveTable = buildAsyncRequestActions<undefined, LeaveTableResponse, PokerMoonsError>('leave the table');

/**
 * @description Toggle players ready status.
 */
export const toggleReadyStatus = buildAsyncRequestActions<undefined, LeaveTableResponse, PokerMoonsError>(
    'toggles a players ready status',
);

/**
 * @description Actions used when the client player attempts to perform an action.
 */
export const performTableAction = buildAsyncRequestActions<
    PerformPlayerActionRequest,
    PerformPlayerActionResponse,
    PokerMoonsError
>('perform player action');
