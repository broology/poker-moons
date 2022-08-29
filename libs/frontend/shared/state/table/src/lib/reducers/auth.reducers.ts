import { on, ReducerTypes } from '@ngrx/store';
import { ClientTableState } from '@poker-moons/shared/type';
import { setPlayerId } from '../actions/auth.actions';
import { ActionType } from '../shared/util/action-util';

export const authReducers: ReducerTypes<ClientTableState, [ActionType<any>]>[] = [
    on(setPlayerId, (state, { payload }) => ({
        ...state,
        playerId: payload.playerId,
    })),
];
