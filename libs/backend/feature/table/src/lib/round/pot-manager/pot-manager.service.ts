import { BadRequestException, Injectable, } from '@nestjs/common';

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
        if(!Number.isInteger(amount)){
            throw new BadRequestException('The pot can only be incremented by integer amounts.');
        }

        // TODO: Update State

        return pot + amount;
    }

    /**
     * Splits the pot between the designated number of players
     * 
     * Note: Often a pot cannot be equally split, so this method returns the remainder.
     * Not sure yet how we should handle the amount leftover.
     * 
     * @param pot - the value of the pot in the current round
     * @param numPlayers - the number of players to split the pot between
     * 
     * @returns the amount to distribute to each player and the amount leftover
     */
     splitPot(pot: number, numPlayers: number): { amountToDistribute: number; amountLeftover: number; } {
        let amountToDistribute = 0;
        let amountLeftover = 0;

        if(pot % numPlayers === 0){
            amountToDistribute = pot / numPlayers;
        }else{
            amountToDistribute = Math.floor(pot / numPlayers);
            amountLeftover = pot % numPlayers;
        }

        return { amountToDistribute, amountLeftover };
    }
}
