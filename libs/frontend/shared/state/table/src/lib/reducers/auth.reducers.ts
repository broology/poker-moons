import { on, ReducerTypes } from '@ngrx/store';
import { setPlayerId } from '../actions/auth.actions';
import { ActionType } from '../shared/util/action-util';
import { TableState } from '../table.state';

export const authReducers: ReducerTypes<TableState, [ActionType<any>]>[] = [
    on(setPlayerId, (state, { payload }) => ({
        ...state,
        playerId: payload.playerId,
    })),
];
