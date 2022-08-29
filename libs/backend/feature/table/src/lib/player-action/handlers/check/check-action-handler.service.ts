import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import {
    CheckPlayerAction,
    PerformPlayerActionResponse,
    Player,
    PokerMoonsError,
    ServerTableState,
} from '@poker-moons/shared/type';
import { Either, isRight, left, right } from 'fp-ts/lib/Either';
import { match } from 'ts-pattern';
import { RoundManagerService } from '../../../round/round-manager/round-manager.service';
import { incrementSeat } from '../../../shared/util/round.util';
import { TableGatewayService } from '../../../shared/websocket/table-gateway.service';
import { TableStateManagerService } from '../../../table-state-manager/table-state-manager.service';
import { validatePlayerTurn } from '../util/validate-player-turn';

@Injectable()
export class CheckActionHandlerService {
    private logger = new CustomLoggerService(CheckActionHandlerService.name);

    constructor(
        private readonly tableGatewayService: TableGatewayService,
        private readonly tableStateManagerService: TableStateManagerService,
        private readonly roundManagerService: RoundManagerService,
    ) {}

    /**
     * @description CheckActionHandlerService.check.
     *
     * Performs the check action and returns an action response if the state is valid, else it throws an error
     * describing the invalid state. Checking is when a player passes the action to the next player while keeping
     * their cards.
     *
     * @type Either<PokerMoonsError, { table: ServerTableState; player: Player }>
     *
     * @param action
     *
     * @returns PerformPlayerActionResponse.
     *
     * @throws Error.
     */
    async check(
        action: Either<PokerMoonsError, { table: ServerTableState; player: Player }>,
    ): Promise<PerformPlayerActionResponse> {
        if (isRight(action)) {
            const { table, player } = action.right;

            if (table.activeRound.activeSeat === null) {
                throw new InternalServerErrorException('Something went wrong, no active seat is set!');
            }

            // Update the player's status in the server
            await this.tableStateManagerService.updateTablePlayer(table.id, player.id, { status: 'checked' });

            // Emit the PlayerTurnEvent to the frontend
            const newActiveSeat = incrementSeat(table.activeRound.activeSeat, table.seatMap);
            this.tableGatewayService.emitTableEvent(table.id, {
                type: 'turn',
                playerId: player.id,
                newStatus: 'checked',
                newActiveSeatId: newActiveSeat,
                bidAmount: 0,
            });

            table.playerMap[player.id] = { ...player, status: 'checked' };
            const playerStatuses = Object.values(table.playerMap).map((player) => player.status);

            return this.roundManagerService.startNextTurn(table, newActiveSeat, playerStatuses);
        } else {
            this.logger.error(action.left);
            throw new BadRequestException(action.left);
        }
    }

    /**
     * @description CheckActionHandlerService.canCheck.
     *
     * Determines if a player is able to check given the current game state. A check can only happen when there is
     * no bet during current round.
     *
     * @type ServerTableState
     * @type Player
     * @type CheckPlayerAction
     *
     * @param table
     * @param player
     * @param action
     *
     * @returns Either<PokerMoonsError, CheckPlayerAction>
     */
    canCheck(
        table: ServerTableState,
        player: Player,
        action: CheckPlayerAction,
    ): Either<PokerMoonsError, { table: ServerTableState; player: Player }> {
        const playerTurn = validatePlayerTurn(table, player, action);

        if (isRight(playerTurn))
            return match([table.activeRound.toCall === 0])
                .with([false], () => left(`Must bet a minimum of ${table.activeRound.toCall}.`))
                .otherwise(() => right({ table, player, action }));
        return playerTurn;
    }
}
