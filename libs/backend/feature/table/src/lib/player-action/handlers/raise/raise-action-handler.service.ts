import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import {
    PerformPlayerActionResponse,
    Player,
    PokerMoonsError,
    RaisePlayerAction,
    Round,
    ServerTableState,
} from '@poker-moons/shared/type';
import { Either, isRight, left, right } from 'fp-ts/lib/Either';
import { match, __ } from 'ts-pattern';
import { PotManagerService } from '../../../round/pot-manager/pot-manager.service';
import { RoundManagerService } from '../../../round/round-manager/round-manager.service';
import { findNextActiveSeatIfExists } from '../../../shared/util/round.util';
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
     * @description RaiseActionHandlerService.raise.
     *
     * Performs the raise action and returns an action response if the state is valid, else it throws an error
     * describing the invalid state. Raising means increasing the size of an existing bet in the current round.
     *
     * @type Either<PokerMoonsError, { table: ServerTableState; player: Player, action: RaisePlayerAction }>
     *
     * @param action
     *
     * @returns PerformPlayerActionResponse.
     *
     * @throws Error.
     */
    async raise(
        action: Either<PokerMoonsError, { table: ServerTableState; player: Player; action: RaisePlayerAction }>,
    ): Promise<PerformPlayerActionResponse> {
        if (isRight(action)) {
            const { table, player } = action.right;

            if (table.activeRound.activeSeat === null) {
                throw new InternalServerErrorException('Something went wrong, no active seat is set!');
            }

            const delta = action.right.action.amount - player.biddingCycleCalled;

            // Update the player's status, biddingCycleCalled amount, and stack in the server
            const playerUpdate: Partial<Player> = {
                status: 'raised',
                biddingCycleCalled: action.right.action.amount,
                stack: player.stack - delta,
            };
            await this.tableStateManagerService.updateTablePlayer(table.id, player.id, playerUpdate);
            table.playerMap[player.id] = { ...player, ...playerUpdate };

            const playerStatuses = Object.values(table.playerMap).map((player) => player.status);

            // Increment the pot
            await this.potManagerService.incrementPot(table.id, table.activeRound.pot, delta);

            // Update toCall amount on round
            const roundUpdates: Partial<Round> = {
                toCall: action.right.action.amount,
                previousRaise: action.right.action.amount,
            };

            await this.tableStateManagerService.updateRound(table.id, roundUpdates);

            // Emit the PlayerTurnEvent to the frontend
            const newActiveSeat = findNextActiveSeatIfExists(table.activeRound.activeSeat, table, playerStatuses);
            this.tableGatewayService.emitTableEvent(table.id, {
                type: 'turn',
                playerId: player.id,
                newStatus: 'raised',
                newActiveSeatId: newActiveSeat,
                bidAmount: delta,
            });
            this.tableGatewayService.emitTableEvent(table.id, {
                type: 'roundChanged',
                ...roundUpdates,
            });

            return this.roundManagerService.startNextTurn(table, newActiveSeat, playerStatuses);
        } else {
            this.logger.error(action.left);
            throw new BadRequestException(action.left);
        }
    }

    /**
     * @description RaiseActionHandlerService.canRaise.
     *
     * Determines if a player is able to raise given the current game state. A raise can happen at any time during
     * a betting round.
     *
     * @type ServerTableState
     * @type Player
     * @type RaisePlayerAction
     *
     * @param table
     * @param player
     * @param action
     *
     * @returns Either<PokerMoonsError, RaisePlayerAction>
     */
    canRaise(
        table: ServerTableState,
        player: Player,
        action: RaisePlayerAction,
    ): Either<PokerMoonsError, { table: ServerTableState; player: Player; action: RaisePlayerAction }> {
        const playerTurn = validatePlayerTurn(table, player, action);

        const minRaise = table.activeRound.toCall + table.activeRound.previousRaise;
        const delta = action.amount - player.biddingCycleCalled;

        if (isRight(playerTurn))
            return match([action.amount >= minRaise, player.stack >= delta])
                .with([false, __.boolean], () => left(`Minimum to raise is ${minRaise}.`))
                .with([__.boolean, false], () =>
                    left(`Player does not have enough chips in their stack. They need at least ${delta} chips.`),
                )
                .otherwise(() => right({ table, player, action }));
        return playerTurn;
    }
}
