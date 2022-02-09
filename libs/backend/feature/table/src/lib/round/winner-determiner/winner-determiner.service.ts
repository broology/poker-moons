import { BadRequestException, Injectable } from '@nestjs/common';
import type { Card, Player, PlayerId, Round, TableId, WinnerMap } from '@poker-moons/shared/type';
import { TableGatewayService } from '../../shared/websocket/table-gateway.service';
import { PotManagerService } from '../pot-manager/pot-manager.service';
import { compareHands, playerHasTwoCards, tableHasFiveCards } from './util/rank';
import { playerMissingCards, roundMissingCards } from './winner-determiner.copy';
import type { Hand, PlayerWithHand, RankHandReponse } from './winner-determiner.types';
import currency = require('currency.js');

@Injectable()
export class WinnerDeterminerService {
    constructor(
        private readonly tableGatewayService: TableGatewayService,
        private readonly potManagerService: PotManagerService,
    ) {}

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
        const playersWithHand: PlayerWithHand[] = [];

        if (!tableHasFiveCards(round.cards)) {
            throw new BadRequestException(roundMissingCards);
        }

        for (const player of players) {
            if (!playerHasTwoCards(player.cards)) {
                throw new BadRequestException(playerMissingCards(player.id));
            }

            playersWithHand.push({
                id: player.id,
                username: player.username,
                cards: player.cards,
                hand: this.findBestHand(player.id, player.username, player.called, player.cards, round.cards).player
                    .hand,
                called: player.called,
            });
        }

        const winnerMap = this.buildWinnerMap(playersWithHand);

        await this.tableGatewayService.emitTableEvent(tableId, {
            type: 'winner',
            winners: winnerMap,
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
    private findBestHand(
        playerId: PlayerId,
        username: string,
        called: number,
        playerCards: [Card, Card],
        tableCards: [Card, Card, Card, Card, Card],
    ): RankHandReponse {
        const playersWithHands: PlayerWithHand[] = [];

        // The table cards are 1 possible hand
        playersWithHands.push({ id: playerId, username, cards: playerCards, hand: tableCards, called });

        /*
         * Iterates through each index and replaces it with each player card, producing 10 hands
         * each using only 1 of the player cards
         */
        for (let x = 0; x < playerCards.length; x += 1) {
            for (let y = 0; y < tableCards.length; y += 1) {
                const newHand: Hand = [...tableCards];
                newHand[y] = playerCards[x];
                playersWithHands.push({ id: playerId, username, cards: playerCards, hand: newHand, called });
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
                playersWithHands.push({ id: playerId, username, cards: playerCards, hand: newHand, called });
            }
        }

        const sortedHands = compareHands(playersWithHands);

        return sortedHands[0];
    }

    /**
     * Builds a map of the winners and the amount that they have won
     *
     * @param playersWithHand - each of the player's and their best hand
     */
    private buildWinnerMap(playersWithHand: PlayerWithHand[]): WinnerMap {
        const winnerMap: WinnerMap = {};

        const sortedHands = compareHands(playersWithHand);

        // Loop through until no unclaimed chips in pot
        while (this.potManagerService.buildPot(playersWithHand) > 0) {
            // An array of players that still have a `called` amount left
            const playersWithCommitment = sortedHands.filter((hand) => hand.player.called > 0);

            // An array of winners that need to be paid out in this iteration
            const winnersToPay = playersWithCommitment.filter(
                (player) => player.score === playersWithCommitment[0].score,
            );

            let collectedSidePot = 0;
            let currentCommitment = 0;
            let collectionAmount = 0;

            for (const winner of winnersToPay) {
                collectedSidePot = 0;
                currentCommitment = winner.player.called;

                // Collect commitment from all players who have money in pot
                for (const player of playersWithHand) {
                    if (player.called > 0) {
                        collectionAmount = Math.min(currentCommitment, player.called);
                        player.called -= collectionAmount;
                        collectedSidePot += collectionAmount;
                    }
                }

                // TODO: Update winner's stack in server state

                const amountWon = this.potManagerService.splitPot(collectedSidePot, winnersToPay.length);

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