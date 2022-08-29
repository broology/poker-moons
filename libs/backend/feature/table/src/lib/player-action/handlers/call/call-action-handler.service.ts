import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import {
    CallPlayerAction,
    PerformPlayerActionResponse,
    Player,
    PokerMoonsError,
    ServerTableState,
} from '@poker-moons/shared/type';
import { Either, isRight, left, right } from 'fp-ts/lib/Either';
import { match } from 'ts-pattern';
import { PotManagerService } from '../../../round/pot-manager/pot-manager.service';
import { RoundManagerService } from '../../../round/round-manager/round-manager.service';
import { incrementSeat } from '../../../shared/util/round.util';
import { TableGatewayService } from '../../../shared/websocket/table-gateway.service';
import { TableStateManagerService } from '../../../table-state-manager/table-state-manager.service';
import { validatePlayerTurn } from '../util/validate-player-turn';

@Injectable()
export class CallActionHandlerService {
    private logger = new CustomLoggerService(CallActionHandlerService.name);

    constructor(
        private readonly tableGatewayService: TableGatewayService,
        private readonly tableStateManagerService: TableStateManagerService,
        private readonly potManagerService: PotManagerService,
        private readonly roundManagerService: RoundManagerService,
    ) {}

    /**
     * @description CallActionHandlerService.call.
     *
     * Performs the call action and returns an action response if the state is valid, else it throws an error
     * describing the invalid state. Calling means matching a bet or raise. To call is to bet the minimum amount to
     * stay active in the current round.
     *
     * @type Either<PokerMoonsError, { table: ServerTableState; player: Player }>
     *
     * @param action
     *
     * @returns PerformPlayerActionResponse.
     *
     * @throws Error.
     */
    async call(
        action: Either<PokerMoonsError, { table: ServerTableState; player: Player }>,
    ): Promise<PerformPlayerActionResponse> {
        if (isRight(action)) {
            const { table, player } = action.right;

            if (table.activeRound.activeSeat === null) {
                throw new InternalServerErrorException('Something went wrong, no active seat is set!');
            }

            const delta = table.activeRound.toCall - player.biddingCycleCalled;
            const newStatus = delta < player.stack ? 'called' : 'all-in';

            // Update the player's status, biddingCycleCalled amount, and stack in the server
            await this.tableStateManagerService.updateTablePlayer(table.id, player.id, {
                status: newStatus,
                biddingCycleCalled: table.activeRound.toCall,
                stack: player.stack - delta,
            });

            // Increment the pot
            await this.potManagerService.incrementPot(table.id, table.activeRound.pot, delta);

            // Emit the PlayerTurnEvent to the frontend
            const newActiveSeat = incrementSeat(table.activeRound.activeSeat, table.seatMap);
            this.tableGatewayService.emitTableEvent(table.id, {
                type: 'turn',
                playerId: player.id,
                newStatus: 'called',
                newActiveSeatId: newActiveSeat,
                bidAmount: delta,
            });

            table.playerMap[player.id] = { ...player, status: 'called' };
            const playerStatuses = Object.values(table.playerMap).map((player) => player.status);

            return this.roundManagerService.startNextTurn(table, newActiveSeat, playerStatuses);
        } else {
            this.logger.error(action.left);
            throw new BadRequestException(action.left);
        }
    }

    /**
     * @description CallActionHandlerService.canCall.
     *
     * Determines if a player is able to call given the current game state. A call can happen at any point during a
     * betting round.
     *
     * @type ServerTableState
     * @type Player
     * @type CallPlayerAction
     *
     * @param table
     * @param player
     * @param action
     *
     * @returns Either<PokerMoonsError, CallPlayerAction>
     */
    canCall(
        table: ServerTableState,
        player: Player,
        action: CallPlayerAction,
    ): Either<PokerMoonsError, { table: ServerTableState; player: Player }> {
        const playerTurn = validatePlayerTurn(table, player, action);

        if (isRight(playerTurn))
            // Can we update this to allow calling a larger bet than the stack?
            return match([player.stack >= table.activeRound.toCall - player.biddingCycleCalled])
                .with([false], () => left(`Minimum to call is ${table.activeRound.toCall}.`))
                .otherwise(() => right({ table, player, action }));

        return playerTurn;
    }
}
