import { PlayerAction, PokerMoonsError, PublicPlayer, ServerTableState } from '@poker-moons/shared/type';
import { Either, left, right } from 'fp-ts/lib/Either';

/**
 * @description Determines if its the current players turn.
 * @param table
 * @type ServerTableState
 * @param player
 * @type PublicPlayer
 * @param action
 * @type PlayerAction
 * @returns Either<PokerMoonsError, PlayerAction>
 */
export function validatePlayerTurn(
    table: ServerTableState,
    player: PublicPlayer,
    action: PlayerAction,
): Either<PokerMoonsError, PlayerAction> {
    if (player.id)
        if (table.activeRound.activeSeat === player.seatId) return right(action);
        else return left("Not player's turn.");
    else return left('Player not found.');
}
