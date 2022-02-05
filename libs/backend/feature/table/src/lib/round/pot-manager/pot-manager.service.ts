import { BadRequestException, Injectable } from '@nestjs/common';
import { Player } from '@poker-moons/shared/type';

@Injectable()
export class PotManagerService {
    /**
     * Increments the pot the designated amount
     *
     * @param pot - the value of the pot in the current round
     * @param amount - the amount to increment the pot by
     *
     * @throws {BadRequestException} if the designated amount is not an integer
     *
     * @returns the incremented pot amount
     */
    incrementPot(pot: number, amount: number): number {
        if (!Number.isInteger(amount)) {
            throw new BadRequestException('The pot can only be incremented by integer amounts.');
        }

        // TODO: Update State

        return pot + amount;
    }

    /**
     * Splits the pot between the designated number of players
     *
     * Note: Often a pot cannot be equally split, but we've decided the
     * leftover amount will just go to the house and not be distributed
     *
     * @param pot - the value of the pot in the current round
     * @param numPlayers - the number of players to split the pot between
     *
     * @returns the amount to distribute to each player and the amount leftover
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
     * Builds the pot amount to distribute to winners at the end of the round based
     * on the amount each player has called, meaning the amount returned includes the main pot
     * amount for the round as well as any side pots that may have formed
     *
     * @param players - the players that participated in the round
     *
     * @returns the pot amount to distribute amongst the winners
     */
    buildPot(players: Pick<Player, 'called'>[]): number {
        let pot = 0;

        for (const player of players) {
            pot += player.called;
        }

        return pot;
    }
}
