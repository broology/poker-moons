import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import { Player, PlayerId, ServerTableState } from '@poker-moons/shared/type';
import { getNextBlindSeat } from '../../shared/util/round.util';
import { TableGatewayService } from '../../shared/websocket/table-gateway.service';
import { TableStateManagerService } from '../../table-state-manager/table-state-manager.service';
import { PotManagerService } from '../pot-manager/pot-manager.service';

@Injectable()
export class BlindManagerService {
    private logger = new CustomLoggerService(BlindManagerService.name);

    private BIG_BLIND = 100;
    private SMALL_BLIND = 50;

    constructor(
        private readonly tableStateManagerService: TableStateManagerService,
        private readonly tableGatewayService: TableGatewayService,
        private readonly potManagerService: PotManagerService,
    ) {}

    getBigBlind(): number {
        return this.BIG_BLIND;
    }

    getSmallBlind(): number {
        return this.SMALL_BLIND;
    }

    /**
     * @description Doles out the blinds of a round of poker.
     *
     * - Handles updating table state with the toCall and small blind amount.
     * - Handles forcing players to put in the big and small blind amounts.
     *
     * @param table - The ServerTableState and table ID.
     */
    async forceBlinds(table: ServerTableState): Promise<void> {
        await this.tableStateManagerService.updateRound(table.id, {
            toCall: this.BIG_BLIND,
            smallBlind: this.SMALL_BLIND,
        });
        let smallBlindId;
        let bigBlindId;
        // traditionally, if there are only 2 players, the dealer gets the small blind
        if (this.getNumberOfActivePlayers(table.playerMap) === 2) {
            smallBlindId = table.activeRound.dealerSeat;
            bigBlindId = getNextBlindSeat(table.activeRound.dealerSeat, table);
        } else {
            smallBlindId = getNextBlindSeat(table.activeRound.dealerSeat, table);
            bigBlindId = getNextBlindSeat(getNextBlindSeat(table.activeRound.dealerSeat, table), table);
        }

        let smallBlindAmount = this.SMALL_BLIND;
        let bigBlindAmount = this.BIG_BLIND;
        for (const player of Object.values(table.playerMap)) {
            if (player.seatId === smallBlindId) {
                let newStackAmount;
                if (player.stack < this.SMALL_BLIND) {
                    newStackAmount = 0;
                    smallBlindAmount = player.stack;
                } else {
                    newStackAmount = player.stack - this.SMALL_BLIND;
                }

                const smallBlindUpdates = {
                    stack: newStackAmount,
                    biddingCycleCalled: smallBlindAmount,
                };

                await this.tableStateManagerService.updateTablePlayer(table.id, player.id, smallBlindUpdates);

                this.tableGatewayService.emitTableEvent(table.id, {
                    ...smallBlindUpdates,
                    id: player.id,
                    type: 'playerChanged',
                });
            } else if (player.seatId == bigBlindId) {
                let newStackAmount;
                if (player.stack < this.BIG_BLIND) {
                    newStackAmount = 0;
                    bigBlindAmount = player.stack;
                } else {
                    newStackAmount = player.stack - this.BIG_BLIND;
                }

                const bigBlindUpdates = {
                    stack: newStackAmount,
                    biddingCycleCalled: bigBlindAmount,
                };

                await this.tableStateManagerService.updateTablePlayer(table.id, player.id, bigBlindUpdates);

                this.tableGatewayService.emitTableEvent(table.id, {
                    ...bigBlindUpdates,
                    type: 'playerChanged',
                    id: player.id,
                });
            }
        }

        await this.potManagerService.incrementPot(table.id, table.activeRound.pot, bigBlindAmount + smallBlindAmount);
    }

    getNumberOfActivePlayers(playerMap: Record<PlayerId, Player>): number {
        let count = 0;
        for (const o of Object.values(playerMap)) {
            if (o.status !== 'out') {
                count++;
            }
        }
        return count;
    }
}
