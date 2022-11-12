import { on, ReducerTypes } from '@ngrx/store';
import { MutablePublicPlayer, PlayerId } from '@poker-moons/shared/type';
import { connectToWs, tableWsActionMap } from '../actions/ws.actions';
import { ActionType } from '../shared/util/action-util';
import { TableState } from '../table.state';

export const wsReducers: ReducerTypes<TableState, [ActionType<any>]>[] = [
    on(connectToWs.success, (state, { payload }) => ({ ...state, ...payload })),

    /**
     * @description When a player joins the table, set the players data in the `immutable` and `mutable` maps. And
     * place them at their seat.
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
     * @description When a player leaves the table, just remove them from the seat. As we need to maintain their
     * player data for history.
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
     * @description When a turn is performed update the players mutable data. And update the active round.
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
                turnCount: round.turnCount + 1,
                activeSeat: newActiveSeatId,
            },
        };
    }),

    /**
     * @description When the round status changes, update the active round data.
     */
    on(tableWsActionMap.roundChanged, (state, { payload }) => {
        return {
            ...state,
            activeRound: {
                ...state.activeRound,
                ...payload,
            },
            // In the case of the cards being dealt, set all players cards
            mutablePlayerMap:
                payload.roundStatus === 'deal'
                    ? Object.entries(state.mutablePlayerMap).reduce(
                          (prev, [playerId, player]) => ({
                              ...prev,
                              [playerId]: {
                                  ...player,
                                  roundCalled: 0,
                                  biddingCycleCalled: 0,
                                  cards: [null, null],
                                  status: 'waiting',
                              },
                          }),
                          state.mutablePlayerMap,
                      )
                    : state.mutablePlayerMap,
            winners: payload.roundStatus === 'deal' ? {} : state.winners,
        };
    }),

    /**
     * @description When a winner is declared at the end of a round. Update the the mutable players pot.
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
            winners: payload.winners,
        };
    }),

    /**
     * @description When the table status has been updated.
     */
    on(tableWsActionMap.tableStatusChanged, (state, { payload }) => {
        return {
            ...state,
            startDate: !payload.startDate ? null : new Date(payload.startDate),
            status: payload.status,
        };
    }),

    /**
     * @description When the player's mutable data changes.
     */
    on(tableWsActionMap.playerChanged, (state, { payload }) => {
        return {
            ...state,
            mutablePlayerMap: {
                ...state.mutablePlayerMap,
                [payload.id]: {
                    ...state.mutablePlayerMap[payload.id],
                    ...payload,
                },
            },
        };
    }),
];
