import { on, ReducerTypes } from '@ngrx/store';
import { ClientTableState } from '@poker-moons/shared/type';
import { connectToWs, tableWsActionMap } from '../actions/ws.actions';
import { ActionType } from '../shared/util/action-util';

export const wsReducers: ReducerTypes<ClientTableState, [ActionType<any>]>[] = [
    on(connectToWs.success, (state, { payload }) => ({ ...state, ...payload })),

    /**
     * When a player joins the table, set the players data in the `immutable` and `mutable` maps.
     * And place them at their seat.
     */
    on(tableWsActionMap.playerJoined, (state, { payload: { seatId, player } }) => {
        const { status, stack, called, ...immutable } = player;

        return {
            ...state,
            immutablePlayerMap: { ...state.immutablePlayerMap, [player.id]: immutable },
            mutablePlayerMap: { ...state.mutablePlayerMap, [player.id]: { status, stack, called } },
            seatMap: { ...state.seatMap, [seatId]: player.id },
        };
    }),

    /**
     * When a player leaves the table, just remove them from the seat. As we need to maintain their player data for history
     */
    on(tableWsActionMap.playerLeft, (state, { payload: { seatId } }) => {
        const playerId = state.seatMap[seatId];

        if (playerId == null) {
            return state;
        }

        return {
            ...state,
            seatMap: { ...state.seatMap, [seatId]: null },
        };
    }),

    /**
     * When a turn is performed update the players mutable data. And update the active round.
     */
    on(tableWsActionMap.turn, (state, { payload }) => {
        const { bidAmount, playerId, newActiveSeatId, newStatus } = payload;

        const mutablePlayer = state.mutablePlayerMap[playerId];
        const round = state.activeRound;

        return {
            ...state,
            mutablePlayerMap: {
                ...state.mutablePlayerMap,
                [playerId]: {
                    ...mutablePlayer,
                    status: newStatus,
                    called: mutablePlayer.called + bidAmount,
                    stack: mutablePlayer.stack - bidAmount,
                },
            },
            activeRound: {
                ...round,
                pot: round.pot + payload.bidAmount,
                toCall:
                    mutablePlayer.called + bidAmount > round.toCall ? mutablePlayer.called + bidAmount : round.toCall,
                turnCount: round.turnCount + 1,
                activeSeat: newActiveSeatId,
            },
        };
    }),

    /**
     * When the round status changes, update the active round data.
     */
    on(tableWsActionMap.roundStatusChanged, (state, { payload }) => ({
        ...state,
        activeRound: {
            ...state.activeRound,
            roundStatus: payload.status,
            cards: payload.cards,
        },
    })),

    /**
     * When a winner is declared at the end of a round. Update the the mutable players pot.
     */
    on(tableWsActionMap.winner, (state, { payload }) => {
        const mutablePlayer = state.mutablePlayerMap[payload.playerId];

        return {
            ...state,
            mutablePlayerMap: {
                ...state.mutablePlayerMap,
                [payload.playerId]: {
                    ...mutablePlayer,
                    stack: mutablePlayer.stack + payload.pot,
                },
            },
        };
    }),
];
