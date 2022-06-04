import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import {
    PerformPlayerActionResponse,
    Player,
    PokerMoonsError,
    RaisePlayerAction,
    ServerTableState,
} from '@poker-moons/shared/type';
import { Either, isRight, left, right } from 'fp-ts/lib/Either';
import { match, __ } from 'ts-pattern';
import { PotManagerService } from '../../../round/pot-manager/pot-manager.service';
import { RoundManagerService } from '../../../round/round-manager/round-manager.service';
import { incrementSeat, isRoundComplete } from '../../../shared/util/round.util';
import { TableGatewayService } from '../../../shared/websocket/table-gateway.service';
import { TableStateManagerService } from '../../../table-state-manager/table-state-manager.service';
import { validatePlayerTurn } from '../util/validate-player-turn';

@Injectable()
export class RaiseActionHandlerService {
    private logger = new CustomLoggerService(RaiseActionHandlerService.name);

    constructor(
        private readonly tableGatewayService: TableGatewayService,
        private readonly tableStateManagerService: TableStateManagerService,
        private readonly potManagerService: PotManagerService,
        private readonly roundManagerService: RoundManagerService,
    ) {}

    /**
     * RaiseActionHandlerService.raise
     * @description Performs the raise action and returns an action response if the state is valid, else it throws an error describing the invalid state.
     * Raising means increasing the size of an existing bet in the current round.
     * @param action
     * @type Either<PokerMoonsError, { table: ServerTableState; player: Player, action: RaisePlayerAction }>
     * @returns PerformPlayerActionResponse
     * @throws Error
     */
    async raise(
        action: Either<PokerMoonsError, { table: ServerTableState; player: Player; action: RaisePlayerAction }>,
    ): Promise<PerformPlayerActionResponse> {
        if (isRight(action)) {
            const { table, player } = action.right;

            if (table.activeRound.activeSeat === null) {
                throw new InternalServerErrorException('Something went wrong, no active seat is set!');
            }

            // Update the player's status, called amount, and stack in the server
            await this.tableStateManagerService.updateTablePlayer(table.id, player.id, {
                status: 'raised',
                called: player.called + action.right.action.amount,
                stack: player.stack - action.right.action.amount,
            });

            // Increment the pot
            await this.potManagerService.incrementPot(table.id, table.activeRound.pot, action.right.action.amount);

            // Update toCall amount on round
            await this.tableStateManagerService.updateRound(table.id, {
                toCall: table.activeRound.toCall + action.right.action.amount,
            });

            // Emit the PlayerTurnEvent to the frontend
            const newActiveSeat = incrementSeat(table.activeRound.activeSeat, table.seatMap);
            this.tableGatewayService.emitTableEvent(table.id, {
                type: 'turn',
                playerId: player.id,
                newStatus: 'raised',
                newActiveSeatId: newActiveSeat,
                bidAmount: action.right.action.amount,
            });

            table.playerMap[player.id] = { ...player, status: 'raised' };
            const playerStatuses = Object.values(table.playerMap).map((player) => player.status);

            // Determine if the round is complete, if it isn't, start the next turn
            if (isRoundComplete(table.activeRound.roundStatus, playerStatuses)) {
                await this.roundManagerService.endRound(table);
            } else {
                await this.roundManagerService.startNextTurn(table, newActiveSeat, playerStatuses);
            }
        } else {
            this.logger.error(action.left);
            throw new BadRequestException(action.left);
        }
    }

    /**
     * RaiseActionHandlerService.canRaise
     * @description Determines if a player is able to raise given the current game state.
     * A raise can happen at any time during a betting round.
     * @param table
     * @type ServerTableState
     * @param player
     * @type Player
     * @param action
     * @type RaisePlayerAction
     * @returns Either<PokerMoonsError, RaisePlayerAction>
     */
    canRaise(
        table: ServerTableState,
        player: Player,
        action: RaisePlayerAction,
    ): Either<PokerMoonsError, { table: ServerTableState; player: Player; action: RaisePlayerAction }> {
        const playerTurn = validatePlayerTurn(table, player, action);

        if (isRight(playerTurn))
            return match([player.stack > table.activeRound.toCall, player.stack > action.amount])
                .with([false, __.boolean], () => left(`Minimum to raise is ${table.activeRound.toCall}.`))
                .with([__.boolean, false], () => left(`Player does not have ${action.amount} in their stack.`))
                .otherwise(() => right({ table, player, action }));
        return playerTurn;
    }
}
