import { createFeature, createReducer } from '@ngrx/store';
import { ClientTableState } from '@poker-moons/shared/type';
import { apiReducers } from './reducers/api.reducers';
import { wsReducers } from './reducers/ws.reducers';

export const TABLE_STATE = 'tableState';

export const initialState: ClientTableState = {
    name: '',
    immutablePlayerMap: {},
    mutablePlayerMap: {},
    seatMap: {},
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
    playerId: null,
    tableId: null,
    startDate: null,
    status: 'lobby',
};

export const storeFeature = createFeature({
    name: TABLE_STATE,
    reducer: createReducer<ClientTableState>(initialState, ...[...wsReducers, ...apiReducers]),
});

export const {
    selectActiveRound,
    selectCards,
    selectPlayerId,
    selectTableId,
    selectImmutablePlayerMap,
    selectMutablePlayerMap,
    selectSeatMap,
    selectStartDate,
    selectStatus,
} = storeFeature;
