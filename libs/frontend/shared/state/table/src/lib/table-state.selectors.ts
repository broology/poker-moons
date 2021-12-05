import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectImmutablePlayerMap, selectMutablePlayerMap, selectPlayerId, TABLE_STATE } from './table.state';

export const selectState = createFeatureSelector(TABLE_STATE);

export const selectClientImmutablePlayer = createSelector(
    selectImmutablePlayerMap,
    selectPlayerId,
    (playerMap, playerId) => (playerId === null ? null : playerMap[playerId]),
);

export const selectClientMutablePlayer = createSelector(selectMutablePlayerMap, selectPlayerId, (playerMap, playerId) =>
    playerId === null ? null : playerMap[playerId],
);
