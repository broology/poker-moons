import { BadRequestException, Injectable } from '@nestjs/common';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import { Player, TableId } from '@poker-moons/shared/type';
import { TableStateManagerService } from '../../table-state-manager/table-state-manager.service';

@Injectable()
export class PotManagerService {
    private logger = new CustomLoggerService(PotManagerService.name);

    constructor(private readonly tableStateManagerService: TableStateManagerService) {}

    /**
     * @description Increments the active pot the designated amount.
     *
     * @param tableId - The table the round is taking place on.
     * @param pot - The value of the pot in the current round.
     * @param amount - The amount to increment the pot by.
     *
     * @throws {BadRequestException} If the designated amount is not an integer.
     */
    async incrementPot(tableId: TableId, pot: number, amount: number): Promise<void> {
        if (!Number.isInteger(amount)) {
            throw new BadRequestException('The pot can only be incremented by integer amounts.');
        }

        this.logger.debug(`Updating pot to ${pot + amount}`);

        await this.tableStateManagerService.updateRound(tableId, { pot: pot + amount });
    }

    /**
     * @description Splits the pot between the designated number of players.
     *
     * Note: Often a pot cannot be equally split, but we've decided the leftover amount will just go to the house
     * and not be distributed.
     *
     * @param pot - The value of the pot in the current round.
     * @param numPlayers - The number of players to split the pot between.
     *
     * @returns The amount to distribute to each player and the amount leftover.
     */
    splitPot(pot: number, numPlayers: number): number {
        let amountToDistribute = 0;

        if (pot % numPlayers === 0) {
            amountToDistribute = pot / numPlayers;
        } else {
            amountToDistribute = Math.floor(pot / numPlayers);
        }

        return amountToDistribute;
    }

    /**
     * @description Builds the pot amount to distribute to winners at the end of the round based on the amount each
     * player has called, meaning the amount returned includes the main pot amount for the round as well as any
     * side pots that may have formed.
     *
     * @param players - The players that participated in the round.
     *
     * @returns The pot amount to distribute amongst the winners.
     */
    buildPot(players: Pick<Player, 'roundCalled'>[]): number {
        let pot = 0;

        for (const player of players) {
            pot += player.roundCalled;
        }

        return pot;
    }
}
