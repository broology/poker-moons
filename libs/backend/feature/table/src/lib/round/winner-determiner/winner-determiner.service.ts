import { BadRequestException, Injectable, } from '@nestjs/common';
import type { Card, Player, PlayerId, Round, TableId } from '@poker-moons/shared/type';
import { TableGatewayService } from '../../shared/websocket/table-gateway.service';
import { PotManagerService } from '../pot-manager/pot-manager.service';
import { compareHands, playerHasTwoCards, tableHasFiveCards } from './util/rank';
import { playerMissingCards, roundMissingCards } from './winner-determiner.copy';
import type { Hand, PlayerWithHand, RankHandReponse } from './winner-determiner.types';

@Injectable()
export class WinnerDeterminerService {
    constructor(private readonly tableGatewayService: TableGatewayService, private readonly potManagerService: PotManagerService) {}

    /**
     * Determines the winner at the end of a round of poker
     * 
     * @param tableId - the table the round is taking place on
     * @param players - the players that have not folded at the end of the round
     * @param round - the current round
     * 
     * @returns the winning player ID(s), the amount won, and text that can be displayed that indicates who won with what hand
     */
    async determineWinner(tableId: TableId, players: Player[], round: Round): Promise<void> {
        const playersWithHands: PlayerWithHand[] = [];

        if(!tableHasFiveCards(round.cards)){
            throw new BadRequestException(roundMissingCards);
        }
        
        for(const player of players){

            if(!playerHasTwoCards(player.cards)){
                throw new BadRequestException(playerMissingCards(player.id));
            }

            playersWithHands.push({ id: player.id, username: player.username, hand: this.findBestHand(player.id, player.username, player.cards, round.cards).player.hand });
        }

        const topHands = compareHands(playersWithHands);

        const winningPlayerIds: PlayerId[] = [];
        const winningPlayerNames: string[] = [];

        for(const hand of topHands){
            winningPlayerIds.push(hand.player.id);
            winningPlayerNames.push(hand.player.username);
        }

        let amountToDistribute = round.pot;

        if(winningPlayerIds.length > 1){
            amountToDistribute = this.potManagerService.splitPot(round.pot, winningPlayerIds.length).amountToDistribute;
        }

        // TODO: Update State

        await this.tableGatewayService.emitTableEvent(tableId, {
            type: 'winner',
            playerIds: winningPlayerIds,
            pot: amountToDistribute,
            displayText: `${winningPlayerNames.join(' and ')} won with a ${topHands[0].category}`
        });
    }

    /**
     * Finds the best hand across the combination of possible hands for a player
     * 
     * In poker a hand consists of 5 cards chosen from 7 total
     * 7 CHOOSE 5 = 21 possible combinations
     * 
     * TODO: Think about a more efficient way to accomplish this without using brute force
     * to create every possible hand combination
     * 
     * @param playerCards - the two cards in the player's hand
     * @param tableCards - the five cards on the table
     */
     private findBestHand(playerId: PlayerId, username: string, playerCards: [Card, Card], tableCards: [Card, Card, Card, Card, Card]): RankHandReponse {
        const playersWithHands: PlayerWithHand[] = [];

        // The table cards are 1 possible hand
        playersWithHands.push({ id: playerId, username, hand: tableCards });

        /*
         * Iterates through each index and replaces it with each player card, producing 10 hands
         * each using only 1 of the player cards
         */
        for (let x = 0; x < playerCards.length; x += 1) {
            for (let y = 0; y < tableCards.length; y += 1) {
              const newHand: Hand = [...tableCards];
              newHand[y] = playerCards[x];
              playersWithHands.push({ id: playerId, username, hand: newHand });
            }
          }

          /*
           * Iterates through and builds another 10 hands each using both of the player cards
           */
          for (let i = 0; i < tableCards.length - 1; i += 1) {
            for (let j = i + 1; j < tableCards.length; j += 1) {
              const newHand: Hand = [...tableCards];
              newHand[i] = playerCards[0];
              newHand[j] = playerCards[1];
              playersWithHands.push({ id: playerId, username, hand: newHand });
            }
          }

        const sortedHands = compareHands(playersWithHands);

        return sortedHands[0];
    }
}
