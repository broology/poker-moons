import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import {
    AllInPlayerAction,
    PerformPlayerActionResponse,
    Player,
    PokerMoonsError,
    ServerTableState,
} from '@poker-moons/shared/type';
import { Either, isRight, right } from 'fp-ts/lib/Either';
import { PotManagerService } from '../../../round/pot-manager/pot-manager.service';
import { RoundManagerService } from '../../../round/round-manager/round-manager.service';
import { incrementSeat } from '../../../shared/util/round.util';
import { TableGatewayService } from '../../../shared/websocket/table-gateway.service';
import { TableStateManagerService } from '../../../table-state-manager/table-state-manager.service';
import { validatePlayerTurn } from '../util/validate-player-turn';

@Injectable()
export class AllInActionHandlerService {
    private logger = new CustomLoggerService(AllInActionHandlerService.name);

    constructor(
        private readonly tableGatewayService: TableGatewayService,
        private readonly tableStateManagerService: TableStateManagerService,
        private readonly potManagerService: PotManagerService,
        private readonly roundManagerService: RoundManagerService,
    ) {}

    /**
     * @description AllInActionHandlerService.allIn.
     *
     * Performs the all-in action and returns an action response if the state is valid, else it throws an error
     * describing the invalid state. All-in means increasing the size of an existing bet in the current round to
     * include all remaining chips in the player's stack.
     *
     * @type Either<PokerMoonsError, { table: ServerTableState; player: Player }>
     *
     * @param action
     *
     * @returns PerformPlayerActionResponse.
     *
     * @throws Error.
     */
    async allIn(
        action: Either<PokerMoonsError, { table: ServerTableState; player: Player }>,
    ): Promise<PerformPlayerActionResponse> {
        if (isRight(action)) {
            const { table, player } = action.right;

            this.logger.debug(`Player ${player.id} is performing an all in action`);

            if (table.activeRound.activeSeat === null) {
                this.logger.error('Active seat is null');
                throw new InternalServerErrorException('Something went wrong, no active seat is set!');
            }

            // Update the player's status, biddingCycleCalled amount, and stack in the server
            await this.tableStateManagerService.updateTablePlayer(table.id, player.id, {
                status: 'all-in',
                biddingCycleCalled: player.biddingCycleCalled + player.stack,
                stack: 0,
            });

            this.logger.debug(`Player ${player.id} updated stack `);

            // Increment the pot
            await this.potManagerService.incrementPot(table.id, table.activeRound.pot, player.stack);

            // Update toCall amount on round
            await this.tableStateManagerService.updateRound(table.id, {
                toCall: player.biddingCycleCalled + player.stack,
            });

            // Emit the PlayerTurnEvent to the frontend
            const newActiveSeat = incrementSeat(table.activeRound.activeSeat, table.seatMap);
            this.tableGatewayService.emitTableEvent(table.id, {
                type: 'turn',
                playerId: player.id,
                newStatus: 'all-in',
                newActiveSeatId: newActiveSeat,
                bidAmount: player.stack,
            });

            table.playerMap[player.id] = { ...player, status: 'all-in' };
            const playerStatuses = Object.values(table.playerMap).map((player) => player.status);

            return this.roundManagerService.startNextTurn(table, newActiveSeat, playerStatuses);
        } else {
            this.logger.error(action.left);
            throw new BadRequestException(action.left);
        }
    }

    /**
     * @description AllInActionHandlerService.canAllIn.
     *
     * Determines if a player is able to go all-in given the current game state. All-in can happen at any time
     * during a betting round.
     *
     * @type ServerTableState
     * @type Player
     * @type AllInPlayerAction
     *
     * @param table
     * @param player
     * @param action
     *
     * @returns Either<PokerMoonsError, RaisePlayerAction>
     */
    canAllIn(
        table: ServerTableState,
        player: Player,
        action: AllInPlayerAction,
    ): Either<PokerMoonsError, { table: ServerTableState; player: Player }> {
        const playerTurn = validatePlayerTurn(table, player, action);

        if (isRight(playerTurn)) return right({ table, player });

        return playerTurn;
    }
}
