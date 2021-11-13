import { createFeature, createReducer, on } from '@ngrx/store';
import { ClientTableState } from '@poker-moons/shared/type';
import { wsConnectionSuccessful } from './table-state.actions';

export const initialState: ClientTableState = {
    playerMap: {},
    seatMap: {
        0: null,
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
    },
    roundCount: 0,
    activeRound: {
        pot: 0,
        smallBlind: 0,
        toCall: 0,
        activeSeat: null,
        roundStatus: 'deal',
        dealerSeat: 0,
        cards: [],
        turnCount: 0,
    },
    cards: [],
};

export const storeFeature = createFeature({
    name: 'tableState',
    reducer: createReducer<ClientTableState>(
        initialState,
        on(wsConnectionSuccessful, (state, { payload }) => ({ ...state, ...payload })),
    ),
});
