import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import { ServerTableState } from '@poker-moons/shared/type';
import { TableStateManagerService } from '../../table-state-manager/table-state-manager.service';
import { TableGatewayService } from '../../shared/websocket/table-gateway.service';
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
     * - Handles updating table state with the toCall and small blind amount
     * - Handles forcing players to put in the big and small blind amounts
     *
     * @param table - the ServerTableState and table ID
     */
    async forceBlinds(table: ServerTableState): Promise<void> {
        await this.tableStateManagerService.updateRound(table.id, {
            toCall: this.BIG_BLIND,
            smallBlind: this.SMALL_BLIND,
        });
        const smallBlindId = this.getNextSeat(table, table.activeRound.dealerSeat);
        const bigBlindId = this.getNextSeat(table, table.activeRound.dealerSeat + 1);
        for (const player of Object.values(table.playerMap)) {
            let newStack;
            if (player.seatId == smallBlindId) {
                await this.tableStateManagerService.updateTablePlayer(table.id, player.id, {
                    stack: player.stack - this.SMALL_BLIND,
                });
                newStack = player.stack - this.SMALL_BLIND;
                this.tableGatewayService.emitTableEvent(table.id, {
                    type: 'playerChanged',
                    id: player.id,
                    stack: newStack,
                });
            } else if (player.seatId == bigBlindId) {
                await this.tableStateManagerService.updateTablePlayer(table.id, player.id, {
                    stack: player.stack - this.BIG_BLIND,
                });
                newStack = player.stack - this.BIG_BLIND;
                this.tableGatewayService.emitTableEvent(table.id, {
                    type: 'playerChanged',
                    id: player.id,
                    stack: newStack,
                });
            }
        }

        await this.potManagerService.incrementPot(table.id, table.activeRound.pot, this.BIG_BLIND + this.SMALL_BLIND);
    }

    /**
     * Gets the next seat id in seat order, ensuring to wrap around the table
     * @param table - the ServerTableState and table ID
     * @param currentSeat - the seat you want to find the next seat of
     */
    getNextSeat(table: ServerTableState, currentSeat: number): number {
        let possibleSeatId = currentSeat + 1;
        if (possibleSeatId >= Object.values(table.playerMap).length) {
            possibleSeatId = 0;
        }
        return possibleSeatId;
    }
}
