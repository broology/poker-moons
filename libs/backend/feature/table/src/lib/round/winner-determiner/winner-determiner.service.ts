import { BadRequestException, Injectable } from '@nestjs/common';
import type { Card, Player, PlayerId, Round, TableId, WinnerMap } from '@poker-moons/shared/type';
import { TableGatewayService } from '../../shared/websocket/table-gateway.service';
import { TableStateManagerService } from '../../table-state-manager/table-state-manager.service';
import { PotManagerService } from '../pot-manager/pot-manager.service';
import { compareHands, playerHasTwoCards, tableHasFiveCards } from './util/rank';
import { playerMissingCards } from './winner-determiner.copy';
import type { Hand, PlayerWithHand, RankHandReponse as RankHandResponse } from './winner-determiner.types';
import currency = require('currency.js');

@Injectable()
export class WinnerDeterminerService {
    constructor(
        private readonly tableGatewayService: TableGatewayService,
        private readonly tableStateManagerService: TableStateManagerService,
        private readonly potManagerService: PotManagerService,
    ) {}

    /**
     * @description Determines the winner at the end of a round of poker.
     *
     * @param tableId - The table the round is taking place on.
     * @param playerMap - A map of the players in the current round.
     * @param round - The current round.
     *
     * @returns The winning player ID(s), the amount won, and text that can be displayed that indicates who won
     *   with what hand.
     */
    async determineWinner(tableId: TableId, playerMap: Record<PlayerId, Player>, round: Round): Promise<void> {
        const playersWithHand: PlayerWithHand[] = [];

        for (const player of Object.values(playerMap)) {
            if (!playerHasTwoCards(player.cards)) {
                throw new BadRequestException(playerMissingCards(player.id));
            }

            if (player.status !== 'folded' && player.status !== 'out') {
                playersWithHand.push({
                    id: player.id,
                    username: player.username,
                    cards: player.cards,
                    hand: tableHasFiveCards(round.cards)
                        ? this.findBestHand(player.id, player.username, player.roundCalled, player.cards, round.cards)
                              .player.hand
                        : null,
                    roundCalled: player.roundCalled,
                });
            }
        }

        const winnerMap = await this.buildWinnerMap(tableId, playerMap, playersWithHand);

        this.tableGatewayService.emitTableEvent(tableId, {
            type: 'winner',
            winners: winnerMap,
        });
    }

    /**
     * @description Finds the best hand across the combination of possible hands for a player.
     *
     * In poker a hand consists of 5 cards chosen from 7 total 7 CHOOSE 5 = 21 possible combinations.
     *
     * TODO: Think about a more efficient way to accomplish this without using brute force to create every possible
     * hand combination.
     *
     * @param playerCards - The two cards in the player's hand.
     * @param tableCards - The five cards on the table.
     */
    private findBestHand(
        playerId: PlayerId,
        username: string,
        roundCalled: number,
        playerCards: [Card, Card],
        tableCards: [Card, Card, Card, Card, Card],
    ): RankHandResponse {
        const playersWithHands: PlayerWithHand[] = [];

        // The table cards are 1 possible hand
        playersWithHands.push({ id: playerId, username, cards: playerCards, hand: tableCards, roundCalled });

        /*
         * Iterates through each index and replaces it with each player card, producing 10 hands
         * each using only 1 of the player cards
         */
        for (let x = 0; x < playerCards.length; x += 1) {
            for (let y = 0; y < tableCards.length; y += 1) {
                const newHand: Hand = [...tableCards];
                newHand[y] = playerCards[x];
                playersWithHands.push({ id: playerId, username, cards: playerCards, hand: newHand, roundCalled });
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
                playersWithHands.push({ id: playerId, username, cards: playerCards, hand: newHand, roundCalled });
            }
        }

        const sortedHands = compareHands(playersWithHands);

        return sortedHands[0];
    }

    /**
     * @description Builds a map of the winners and the amount that they have won.
     *
     * @param tableId - The table the round is taking place on.
     * @param playerMap - A map of the players in the current round.
     * @param playersWithHand - Each of the non-folded player's and their best hand.
     */
    private async buildWinnerMap(
        tableId: TableId,
        playerMap: Record<PlayerId, Player>,
        playersWithHand: PlayerWithHand[],
    ): Promise<WinnerMap> {
        const winnerMap: WinnerMap = {};
        const players = Object.values(playerMap);
        const sortedHands = compareHands(playersWithHand);

        // Loop through until no unclaimed chips in pot
        while (this.potManagerService.buildPot(players) > 0) {
            // An array of non-folded players that still have a `roundCalled` amount left
            const playersWithCommitment = sortedHands.filter((hand) => playerMap[hand.player.id].roundCalled > 0);

            // An array of winners that need to be paid out in this iteration
            const winnersToPay = playersWithCommitment.filter(
                (player) => player.score === playersWithCommitment[0].score,
            );

            let currentCommitment = 0;
            let collectionAmount = 0;

            for (const winner of winnersToPay) {
                let collectedSidePot = 0;
                currentCommitment = winner.player.roundCalled;

                // Collect commitment from all players who have money in pot
                for (const player of players) {
                    if (player.roundCalled > 0) {
                        collectionAmount = Math.min(currentCommitment, player.roundCalled);
                        player.roundCalled -= collectionAmount;
                        collectedSidePot += collectionAmount;
                    }
                }

                const amountWon = this.potManagerService.splitPot(collectedSidePot, winnersToPay.length);

                // Update winner's stack in server state
                await this.tableStateManagerService.updateTablePlayer(tableId, winner.player.id, {
                    stack: playerMap[winner.player.id].stack + amountWon,
                });

                winnerMap[winner.player.id] = {
                    amountWon,
                    cards: winner.player.cards,
                    displayText: `${winner.player.username} won ${currency(amountWon).format()} with a ${
                        winner.category
                    }`,
                };
            }
        }

        return winnerMap;
    }
}
