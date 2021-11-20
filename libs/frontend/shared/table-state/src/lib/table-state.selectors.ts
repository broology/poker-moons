import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectPlayerId, selectPlayerMap, TABLE_STATE } from './table.state';

export const selectState = createFeatureSelector(TABLE_STATE);

export const selectClientPlayer = createSelector(selectPlayerMap, selectPlayerId, (playerMap, playerId) =>
    playerId === null ? null : playerMap[playerId],
);
