import { createFeature, createReducer, on } from '@ngrx/store';
import { ClientTableState } from '@poker-moons/shared/type';
import { connectToWs, tableWsActionMap } from './actions/ws.actions';

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
    playerId: null,
};

export const storeFeature = createFeature({
    name: 'tableState',
    reducer: createReducer<ClientTableState>(
        initialState,
        on(connectToWs.success, (state, { payload }) => ({ ...state, ...payload })),
        on(tableWsActionMap.playerJoined, (state, { payload: { seatId, player } }) => ({
            ...state,
            playerMap: { ...state.playerMap, [player.id]: player },
            seatMap: { ...state.seatMap, [seatId]: player.id },
        })),
        on(tableWsActionMap.playerLeft, (state, { payload: { seatId } }) => {
            const playerId = state.seatMap[seatId];

            if (playerId == null) {
                return state;
            }

            return {
                ...state,
                playerMap: { ...state.playerMap, [playerId]: undefined },
                seatMap: { ...state.seatMap, [seatId]: null },
            };
        }),
        on(tableWsActionMap.turn, (state, { payload }) => {
            const { bidAmount, playerId, newActiveSeatId, newStatus } = payload;

            const player = state.playerMap[playerId];
            const round = state.activeRound;

            return {
                ...state,
                playerMap: {
                    ...state.playerMap,
                    [playerId]: {
                        ...player,
                        status: newStatus,
                        called: player.called + bidAmount,
                        stack: player.stack - bidAmount,
                    },
                },
                activeRound: {
                    ...round,
                    pot: round.pot + payload.bidAmount,
                    toCall: player.called + bidAmount > round.toCall ? player.called + bidAmount : round.toCall,
                    turnCount: round.turnCount + 1,
                    activeSeat: newActiveSeatId,
                },
            };
        }),
        on(tableWsActionMap.roundStatusChanged, (state, { payload }) => ({
            ...state,
            activeRound: {
                ...state.activeRound,
                roundStatus: payload.status,
                cards: payload.cards,
            },
        })),
        on(tableWsActionMap.winner, (state, { payload }) => {
            const player = state.playerMap[payload.playerId];

            return {
                ...state,
                playerMap: {
                    ...state.playerMap,
                    [payload.playerId]: {
                        ...player,
                        stack: player.stack + payload.pot,
                    },
                },
            };
        }),
    ),
});
