import type { PlayerStatus, RoundStatus, SeatId } from '@poker-moons/shared/type';

const countOccurrences = (playerStatuses: PlayerStatus[], status: PlayerStatus) =>
    playerStatuses.reduce((index, value) => (value === status ? index + 1 : index), 0);

/**
 * Provided the status of the round and statuses of each of the players in a round,
 * returns true if the round is complete and the winner determiner should be
 * called or false if the round should continue
 */
export function isRoundComplete(roundStatus: RoundStatus, playerStatuses: PlayerStatus[]): boolean {
    // Handles the case where everyone except for 1 player folds, resulting in the end of the round
    if (countOccurrences(playerStatuses, 'folded') === playerStatuses.length - 1) {
        return true;
    }

    // If it's the river and one player has raised or gone all-in and everyone else has either called or folded, the round is over
    if (
        roundStatus === 'river' &&
        (countOccurrences(playerStatuses, 'raised') === 1 || countOccurrences(playerStatuses, 'all-in') === 1) &&
        countOccurrences(playerStatuses, 'called') + countOccurrences(playerStatuses, 'folded') ===
            playerStatuses.length - 1
    ) {
        return true;
    }

    // If it's the river and everyone checks, the round is over
    if (roundStatus === 'river' && countOccurrences(playerStatuses, 'checked') === playerStatuses.length) {
        return true;
    }

    return false;
}

/**
 * Provided the current seat, returns the next seat in sequence
 */
export function incrementSeat(seat: SeatId): SeatId {
    if (seat === 5) {
        return 0;
    }

    return (seat + 1) as SeatId;
}

/**
 * Provided the statuses of each of the players in a round, returns true if everyone has
 * taken their turn, in which case those who have not folded will need to have ther
 * status reset to waiting
 */
export function hasEveryoneTakenTurn(playerStatuses: PlayerStatus[]): boolean {
    if (countOccurrences(playerStatuses, 'waiting') === 0) {
        return true;
    }

    return false;
}
