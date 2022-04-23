import { on, ReducerTypes } from '@ngrx/store';
import { ClientTableState } from '@poker-moons/shared/type';
import { getCards, joinTable, leaveTable } from '../actions/api.actions';
import { ActionType } from '../shared/util/action-util';

export const apiReducers: ReducerTypes<ClientTableState, [ActionType<any>]>[] = [
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

    // Does nothing currently
    //on(preformTableAction.success, (state, { payload }) => state),
    //on(toggleReadyStatus.success, (state, { payload }) => state),

    on(getCards.success, (state, { payload }) => ({ ...state, cards: payload })),
];
