import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MutablePublicPlayer, PlayerId, SeatId } from '@poker-moons/shared/type';

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

export const selectBigBlindSeat = createSelector(
    selectActiveRound,
    selectSeatMap,
    selectMutablePlayerMap,
    (round, seatMap, playerMap) => {
        if (Object.keys(seatMap).length > 0) {
            if (getNumberOfActivePlayers(seatMap) === 2) {
                return getNextSeat(round.dealerSeat, seatMap, playerMap);
            } else {
                return getNextSeat(getNextSeat(round.dealerSeat, seatMap, playerMap), seatMap, playerMap);
            }
        } else {
            return 0;
        }
    },
);

export const selectSmallBlindSeat = createSelector(
    selectActiveRound,
    selectSeatMap,
    selectMutablePlayerMap,
    (round, seatMap, playerMap) => {
        if (Object.keys(seatMap).length > 0) {
            if (getNumberOfActivePlayers(playerMap) === 2) {
                return round.dealerSeat.valueOf();
            } else {
                return getNextSeat(round.dealerSeat, seatMap, playerMap);
            }
        } else {
            return 0;
        }
    },
);

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
function getNextSeat(
    currentSeatId: SeatId,
    seatMap: Partial<Record<SeatId, PlayerId>>,
    playerMap: Record<PlayerId, MutablePublicPlayer>,
): SeatId {
    const nextSeatId = incrementSeat(currentSeatId, seatMap);

    const playerId = seatMap[nextSeatId];

    if (!playerId) {
        return getNextSeat(nextSeatId, seatMap, playerMap);
    }

    const player = playerMap[playerId];

    if (player.status === 'out') {
        return getNextSeat(nextSeatId, seatMap, playerMap);
    }

    return nextSeatId;
}

function incrementSeat(seat: SeatId, seatMap: Partial<Record<SeatId, PlayerId>>): SeatId {
    if (Object.keys(seatMap).length === 0) {
        throw new Error('Unexpected error has occurred. (CODE: INCREMENTING_SEAT_IN_EMPTY_SEAT_MAP)');
    }

    const nextSeat = ((seat + 1) % 6) as SeatId;
    const nextPlayer = seatMap[nextSeat];

    if (nextPlayer) {
        return nextSeat;
    } else {
        return incrementSeat(nextSeat, seatMap);
    }
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
