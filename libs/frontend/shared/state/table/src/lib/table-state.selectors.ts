import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ImmutablePublicPlayer, MutablePublicPlayer, Player, PlayerId, SeatId } from '@poker-moons/shared/type';

import {
    selectActiveRound,
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

export const selectClientSeatId = createSelector(
    selectClientImmutablePlayer,
    (immutablePlayer) => immutablePlayer?.seatId,
);

export const selectActiveSeatId = createSelector(selectActiveRound, (round) => round.activeSeat);

export const selectDealerSeat = createSelector(selectActiveRound, (round) => round.dealerSeat);

export const selectBigBlindSeat = createSelector(selectActiveRound, selectMutablePlayerMap, (round, playerMap) => {
    if (getNumberOfActivePlayers(playerMap) === 2) {
        return getNextSeat(round.dealerSeat.valueOf(), playerMap);
    } else {
        return getNextSeat(getNextSeat(round.dealerSeat.valueOf(), playerMap), playerMap);
    }
});

export const selectSmallBlindSeat = createSelector(selectActiveRound, selectMutablePlayerMap, (round, playerMap) => {
    if (getNumberOfActivePlayers(playerMap) === 2) {
        return round.dealerSeat.valueOf();
    } else {
        return getNextSeat(round.dealerSeat.valueOf(), playerMap);
    }
});

export const selectSumRoundCalled = createSelector(selectMutablePlayerMap, (mutablePlayerMap) =>
    Object.values(mutablePlayerMap).reduce((prev, cur) => prev + cur.roundCalled, 0),
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

/**
 * @description Gets the next seat id in seat order, ensuring to wrap around the table.
 *
 * @param currentSeat - The seat you want to find the next seat of.
 */
function getNextSeat(currentSeat: number, playerMap: Record<PlayerId, MutablePublicPlayer>): number {
    if (playerMap) {
        let possibleSeatId = currentSeat + 1;
        if (possibleSeatId >= Object.keys(playerMap).length) {
            possibleSeatId = 0;
        }
        return possibleSeatId;
    }
    return -100;
}

function getNumberOfActivePlayers(playerMap: Record<PlayerId, MutablePublicPlayer>): number {
    let count = 0;
    for (const o of Object.values(playerMap)) {
        if (o.status !== 'out') {
            count++;
        }
    }
    return count;
}
