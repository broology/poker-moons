import { on, ReducerTypes } from '@ngrx/store';
import { ClientTableState, MutablePublicPlayer, PlayerId } from '@poker-moons/shared/type';
import { connectToWs, tableWsActionMap } from '../actions/ws.actions';
import { ActionType } from '../shared/util/action-util';

export const wsReducers: ReducerTypes<ClientTableState, [ActionType<any>]>[] = [
    on(connectToWs.success, (state, { payload }) => ({ ...state, ...payload })),

    /**
     * When a player joins the table, set the players data in the `immutable` and `mutable` maps.
     * And place them at their seat.
     */
    on(tableWsActionMap.playerJoined, (state, { payload: { seatId, player } }) => {
        const { stack, status, biddingCycleCalled, roundCalled, cards, ready, timeBank, ...immutable } = player;

        const mutable: MutablePublicPlayer = { stack, status, biddingCycleCalled, roundCalled, cards, ready, timeBank };

        return {
            ...state,
            immutablePlayerMap: { ...state.immutablePlayerMap, [player.id]: immutable },
            mutablePlayerMap: { ...state.mutablePlayerMap, [player.id]: mutable },
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
                    biddingCycleCalled: mutablePlayer.biddingCycleCalled + bidAmount,
                    stack: mutablePlayer.stack - bidAmount,
                },
            },
            activeRound: {
                ...round,
                pot: round.pot + payload.bidAmount,
                toCall:
                    mutablePlayer.biddingCycleCalled + bidAmount > round.toCall
                        ? mutablePlayer.biddingCycleCalled + bidAmount
                        : round.toCall,
                turnCount: round.turnCount + 1,
                activeSeat: newActiveSeatId,
            },
        };
    }),

    /**
     * When the round status changes, update the active round data.
     */
    on(tableWsActionMap.roundStatusChanged, (state, { payload }) => {
        return {
            ...state,
            activeRound: {
                ...state.activeRound,
                roundStatus: payload.status,
                cards: payload.cards,
                activeSeat: payload.activeSeat,
                toCall: payload.toCall,
            },
            // In the case of the cards being dealt, set all players cards
            mutablePlayerMap:
                payload.status === 'deal'
                    ? Object.entries(state.mutablePlayerMap).reduce(
                          (prev, [playerId, player]) => ({
                              ...prev,
                              [playerId]: {
                                  ...player,
                                  cards: [null, null],
                              },
                          }),
                          state.mutablePlayerMap,
                      )
                    : state.mutablePlayerMap,
        };
    }),

    /**
     * When a winner is declared at the end of a round. Update the the mutable players pot.
     */
    on(tableWsActionMap.winner, (state, { payload }) => {
        const mutablePlayerMap: Record<PlayerId, MutablePublicPlayer> = {};

        for (const playerId of Object.keys(payload.winners)) {
            const mutablePlayer = state.mutablePlayerMap[playerId as PlayerId];
            mutablePlayerMap[playerId as PlayerId] = {
                ...mutablePlayer,
                stack: mutablePlayer.stack + payload.winners[playerId as PlayerId].amountWon,
            };
        }

        return {
            ...state,
            mutablePlayerMap: {
                ...state.mutablePlayerMap,
                ...mutablePlayerMap,
            },
        };
    }),

    /**
     * When the table status has been updated
     */
    on(tableWsActionMap.tableStatusChanged, (state, { payload }) => {
        return {
            ...state,
            startDate: !payload.startDate ? state.startDate : new Date(payload.startDate),
            status: payload.status,
        };
    }),

    /**
     * When the player exceeds default timeout, using their time bank
     */
    on(tableWsActionMap.playerTimeBank, (state, { payload }) => {
        return {
            ...state,
            mutablePlayerMap: {
                ...state.mutablePlayerMap,
                [payload.playerId]: {
                    ...state.mutablePlayerMap[payload.playerId],
                    timeBank: payload.timeBank,
                },
            },
        };
    }),

    /**
     * When the player changes their ready status
     */
    on(tableWsActionMap.playerReadyStatus, (state, { payload }) => {
        return {
            ...state,
            mutablePlayerMap: {
                ...state.mutablePlayerMap,
                [payload.playerId]: {
                    ...state.mutablePlayerMap[payload.playerId],
                    ready: payload.ready,
                },
            },
        };
    }),
];
