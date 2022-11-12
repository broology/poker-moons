import { createFeature, createReducer } from '@ngrx/store';
import { ClientTableState } from '@poker-moons/shared/type';
import { apiReducers } from './reducers/api.reducers';
import { authReducers } from './reducers/auth.reducers';
import { wsReducers } from './reducers/ws.reducers';
import { PlayerApiService } from './shared/data-access/player-api.service';

export const TABLE_STATE = 'tableState';

/**
 * @description Enforces a loading state for each method in the player api service.
 */
export type ApiLoaderStates = Record<keyof PlayerApiService, boolean>;

export type TableState = ClientTableState & { loaders: ApiLoaderStates };

export const initialState: TableState = {
    immutablePlayerMap: {},
    mutablePlayerMap: {},
    seatMap: {},
    roundCount: 0,
    activeRound: {
        previousRaise: 0,
        pot: 0,
        smallBlind: 0,
        toCall: 0,
        activeSeat: null,
        roundStatus: 'deal',
        dealerSeat: 0,
        cards: [],
        turnCount: 0,
    },
    playerId: null,
    tableId: null,
    startDate: null,
    status: 'lobby',
    winners: {},
    loaders: {
        join: false,
        leave: false,
        toggleReadyStatus: false,
        performAction: false,
        getCards: false,
    },
};

export const storeFeature = createFeature({
    name: TABLE_STATE,
    reducer: createReducer<TableState>(initialState, ...[...wsReducers, ...apiReducers, ...authReducers]),
});

export const {
    selectActiveRound,
    selectPlayerId,
    selectTableId,
    selectImmutablePlayerMap,
    selectMutablePlayerMap,
    selectSeatMap,
    selectStartDate,
    selectStatus,
    selectWinners,
    selectLoaders,
} = storeFeature;
