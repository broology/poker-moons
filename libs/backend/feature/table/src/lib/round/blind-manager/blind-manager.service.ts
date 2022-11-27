import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import { Player, PlayerId, ServerTableState } from '@poker-moons/shared/type';
import { TableGatewayService } from '../../shared/websocket/table-gateway.service';
import { TableStateManagerService } from '../../table-state-manager/table-state-manager.service';
import { PotManagerService } from '../pot-manager/pot-manager.service';
import { countOccurrences } from '../../shared/util/round.util';

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
            bigBlindId = this.getNextSeat(table, this.getNextSeat(table, table.activeRound.dealerSeat));
        } else {
            smallBlindId = this.getNextSeat(table, table.activeRound.dealerSeat);
            bigBlindId = this.getNextSeat(table, this.getNextSeat(table, table.activeRound.dealerSeat));
        }

        for (const player of Object.values(table.playerMap)) {
            if (player.seatId === smallBlindId) {
                const smallBlindUpdates = {
                    stack: player.stack - this.SMALL_BLIND,
                    biddingCycleCalled: this.SMALL_BLIND,
                };

                await this.tableStateManagerService.updateTablePlayer(table.id, player.id, smallBlindUpdates);

                this.tableGatewayService.emitTableEvent(table.id, {
                    ...smallBlindUpdates,
                    id: player.id,
                    type: 'playerChanged',
                });
            } else if (player.seatId == bigBlindId) {
                const bigBlindUpdates = {
                    stack: player.stack - this.BIG_BLIND,
                    biddingCycleCalled: this.BIG_BLIND,
                };

                await this.tableStateManagerService.updateTablePlayer(table.id, player.id, bigBlindUpdates);

                this.tableGatewayService.emitTableEvent(table.id, {
                    ...bigBlindUpdates,
                    type: 'playerChanged',
                    id: player.id,
                });
            }
        }

        await this.potManagerService.incrementPot(table.id, table.activeRound.pot, this.BIG_BLIND + this.SMALL_BLIND);
    }

    /**
     * @description Gets the next seat id in seat order, ensuring to wrap around the table.
     *
     * @param table - The ServerTableState and table ID.
     * @param currentSeat - The seat you want to find the next seat of.
     */
    getNextSeat(table: ServerTableState, currentSeat: number): number {
        let possibleSeatId = currentSeat + 1;
        if (possibleSeatId >= Object.values(table.playerMap).length) {
            possibleSeatId = 0;
        }
        return possibleSeatId;
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
