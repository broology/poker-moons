import { on, ReducerTypes } from '@ngrx/store';
import { getCards, joinTable, leaveTable, performTableAction, toggleReadyStatus } from '../actions/api.actions';
import { ActionType, buildAsyncRequestLoaderReducers } from '../shared/util/action-util';
import { TableState } from '../table.state';

export const apiReducers: ReducerTypes<TableState, [ActionType<any>]>[] = [
    on(joinTable.success, (state, { payload }) => ({
        ...state,
        playerId: payload.id,
        cards: payload.cards,
    })),

    on(leaveTable.success, (state, { payload }) => ({
        ...state,
        playerId: payload.id,
        cards: [],
    })),
    on(getCards.success, (state, { payload: { playerId, cards } }) => ({
        ...state,
        mutablePlayerMap: {
            ...state.mutablePlayerMap,
            [playerId]: {
                ...state.mutablePlayerMap[playerId],
                cards: cards,
            },
        },
    })),

    // Loader Reducers
    ...buildAsyncRequestLoaderReducers(joinTable, 'join'),
    ...buildAsyncRequestLoaderReducers(leaveTable, 'leave'),
    ...buildAsyncRequestLoaderReducers(toggleReadyStatus, 'toggleReadyStatus'),
    ...buildAsyncRequestLoaderReducers(getCards, 'getCards'),
    ...buildAsyncRequestLoaderReducers(performTableAction, 'performAction'),
];
