import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import { ServerTableState } from '@poker-moons/shared/type';
import { TableGatewayService } from '../../shared/websocket/table-gateway.service';
import { TableStateManagerService } from '../../table-state-manager/table-state-manager.service';
import { PotManagerService } from '../pot-manager/pot-manager.service';

@Injectable()
export class BlindManagerService {
    private logger = new CustomLoggerService(BlindManagerService.name);

    private BIG_BLIND = 10;
    private SMALL_BLIND = 5;

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
        const smallBlindId = this.getNextSeat(table, table.activeRound.dealerSeat);
        const bigBlindId = this.getNextSeat(table, this.getNextSeat(table, table.activeRound.dealerSeat));

        for (const player of Object.values(table.playerMap)) {
            if (player.seatId == smallBlindId) {
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
}
