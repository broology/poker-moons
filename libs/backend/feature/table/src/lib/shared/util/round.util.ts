import type {
    Player,
    PlayerId,
    PlayerStatus,
    Round,
    RoundStatus,
    SeatId,
    ServerTableState,
} from '@poker-moons/shared/type';

/**
 * @description Counts the occurrences of a particular player status from an array of statuses.
 */
const countOccurrences = (playerStatuses: PlayerStatus[], status: PlayerStatus) =>
    playerStatuses.reduce((index, value) => (value === status ? index + 1 : index), 0);

/**
 * @description Provided the status of the round and statuses of each of the players in a round, returns true if
 * the round is complete and the winner determiner should be called or false if the round should continue.
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

    // If everyone is folded then the round is complete.
    if (countOccurrences(playerStatuses, 'folded') === playerStatuses.length) {
        return true;
    }

    return false;
}

/**
 * @description Determines if a round a can be auto-completed, which occurs when less than 2 players are actively bidden.
 */
export function isAutoCompletable(playerStatuses: PlayerStatus[]): boolean {
    // If there is ever a point where every player has all-ined or folded, or every player but one has all-ined or folded, the round is over
    if (
        countOccurrences(playerStatuses, 'all-in') + countOccurrences(playerStatuses, 'folded') ===
            playerStatuses.length - 1 ||
        countOccurrences(playerStatuses, 'all-in') + countOccurrences(playerStatuses, 'folded') ===
            playerStatuses.length
    ) {
        return true;
    }

    return false;
}

/**
 * @description This function assumes that someone at the table must be active, and must always be paired with
 * {@link findNextActiveSeatIfExists}. Will iterate through the table, finding the next seat that is not 'all-in',
 * 'folded' or 'out.
 *
 * @param currentSeatId
 * @param table
 */
function nextActiveSeat(currentSeatId: SeatId, table: Pick<ServerTableState, 'playerMap' | 'seatMap'>): SeatId {
    const nextSeatId = incrementSeat(currentSeatId, table.seatMap);

    const playerId = table.seatMap[nextSeatId];

    if (!playerId) {
        return nextActiveSeat(nextSeatId, table);
    }

    const player = table.playerMap[playerId];

    if (player.status === 'all-in' || player.status === 'folded' || player.status === 'out') {
        return nextActiveSeat(nextSeatId, table);
    }

    return nextSeatId;
}

/**
 * @description Helper function to find the next active seat if it exists.
 *
 * If all players are `all-in`, `folded`, or `out`. Then there is no next active seat and it returns null.
 * Otherwise, it will increment each seat at the table, and check if they are one of the status listed beforehand,
 * then it will skip to the next player.
 *
 * @param currentSeatId
 * @param table
 * @param playerStatuses
 *
 * @returns Next active seat in the current bidding cycle if it exists.
 */
export function findNextActiveSeatIfExists(
    currentSeatId: SeatId,
    table: Pick<ServerTableState, 'playerMap' | 'seatMap'>,
    playerStatuses: PlayerStatus[],
): SeatId | null {
    if (
        playerStatuses.length ===
        countOccurrences(playerStatuses, 'all-in') +
            countOccurrences(playerStatuses, 'folded') +
            countOccurrences(playerStatuses, 'out')
    ) {
        return null;
    }

    return nextActiveSeat(currentSeatId, table);
}

/**
 * @description A recursive function that, provided the current seat and seat map, returns the next seat in
 * sequence that has a player associated with it.
 */
export function incrementSeat(seat: SeatId, seatMap: Partial<Record<SeatId, PlayerId>>): SeatId {
    const nextSeat = ((seat + 1) % 6) as SeatId;
    const nextPlayer = seatMap[nextSeat];

    if (nextPlayer) {
        return nextSeat;
    } else {
        return incrementSeat(nextSeat, seatMap);
    }
}

/**
 * @description Provided the current round status, returns the next status in sequence.
 */
export function incrementRoundStatus(status: RoundStatus): RoundStatus {
    switch (status) {
        case 'deal':
            return 'flop';
        case 'flop':
            return 'turn';
        case 'turn':
            return 'river';
        case 'river':
            return 'deal';
    }
}

/**
 * @description Provided the statuses of each of the players in a round, returns true if everyone has taken their
 * turn, in which case those who have not folded will need to have their status reset to waiting and the round
 * status will need to change.
 */
export function hasEveryoneTakenTurn(playerStatuses: PlayerStatus[]): boolean {
    if (countOccurrences(playerStatuses, 'waiting') === 0) {
        return true;
    }

    return false;
}

/**
 * @description If all but one player is folded, then they automatically win, thus bidding cycle is over.
 */
export function hasEveryoneButOneFolded(playerStatuses: PlayerStatus[]): boolean {
    if (countOccurrences(playerStatuses, 'folded') === playerStatuses.length - 1) {
        return true;
    }

    return false;
}

/**
 * @description Determining if the bidding cycle has ended.
 *
 * Players must match the rounds `toCall` value unless they are all in or folded.
 */
export function hasBiddingCycleEnded(
    players: Pick<Player, 'biddingCycleCalled' | 'status'>[],
    round: Pick<Round, 'toCall'>,
): boolean {
    for (const player of players) {
        if (player.status !== 'all-in' && player.status !== 'folded' && player.biddingCycleCalled < round.toCall) {
            return false;
        }
    }

    return true;
}

/**
 * @description Determines whether a player is actively apart of the round.
 *
 * A player is only not actively part of the round, if:
 *
 * - They have folded.
 * - They are out of chips.
 */
export function isActivePlayer(player: Pick<Player, 'status'>): boolean {
    return player.status !== 'folded' && player.status !== 'out';
}
