import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SeatId } from '@poker-moons/shared/type';
import {
    selectImmutablePlayerMap,
    selectMutablePlayerMap,
    selectPlayerId,
    selectSeatMap,
    TABLE_STATE,
} from './table.state';

export const selectState = createFeatureSelector(TABLE_STATE);

export const selectClientImmutablePlayer = createSelector(
    selectImmutablePlayerMap,
    selectPlayerId,
    (playerMap, playerId) => (playerId === null ? null : playerMap[playerId]),
);

export const selectClientMutablePlayer = createSelector(selectMutablePlayerMap, selectPlayerId, (playerMap, playerId) =>
    playerId === null ? null : playerMap[playerId],
);

export const selectMutablePlayerBySeatId = (props: { seatId: SeatId }) =>
    createSelector(selectSeatMap, selectMutablePlayerMap, (seatMap, mutablePlayerMap) => {
        const playerId = seatMap[props.seatId];

        if (!playerId) {
            return null;
        }

        return mutablePlayerMap[playerId];
    });

export const selectImmutablePlayerBySeatId = (props: { seatId: SeatId }) =>
    createSelector(selectSeatMap, selectImmutablePlayerMap, (seatMap, immutablePlayerMap) => {
        const playerId = seatMap[props.seatId];

        if (!playerId) {
            return null;
        }

        return immutablePlayerMap[playerId];
    });
