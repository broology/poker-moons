import { Injectable, NotImplementedException } from '@nestjs/common'
import { Card, PlayerAction, AIPlayer, Table, Round, CheckPlayerAction, CallPlayerAction, FoldPlayerAction, RaisePlayerAction, AllInPlayerAction, playerActions } from "@poker-moons/shared/type";
//import { AIPlayer } from "@poker-moons/shared/type";

@Injectable
export class AIPlayerLogicService{

    evaluateWinChance(player: AIPlayer, round: Round): number {
        //Can add more complex logic in the future, but for now a simple blind Expected Value can be used as a placeholder.
        //simplest case can just use rank.ts to determine best 5 card hand available, then take (bestHandRank / totalRanks) to find percentage of beating an arbitrary hand
        //remove own pocket cards from ranking system as no other hands that contain them are possible for other players to have
        //then add a small fudge factor because players have 7 cards to choose from as well, so they have more than one hand to choose from, so no player will take their worst hand
        //winChance = (bestHandRank) / (numberofPossibleHandsWithoutOwnCards)
        //if winChance > (1/numPlayersActive), standard AI personality assumes it is favoured to win the round
        return 0;

        //TODO:
    }

    decideRaiseAmount(player: AIPlayer, round: Round): number {
        //used to determine the amount of chips the ai player will call up to, or raise up to if it performs those actions
        return 0;

    }

    decideAction(player: AIPlayer, round: Round): PlayerAction {
        //use winChance to determine whether to check, call, raise, or fold
        const winChance = this.evaluateWinChance(player, round)
        //generate random number as random variance spice value, potentially based off AIPlayer difficulty/personality settings
        //this represents the deviation from what the ai considers "optimal" play that the ai will accept this round.
        //Higher difficulty AI should have a smaller difficulty factor, leading to more consistently "correct" play
        //const currentSpice = randomInt(-100, 100) * player.difficultyFactor
        //if round.toCall == player.called, then check is an option.
        const risk = (round.toCall - player.called / player.stack) * player.riskFactor
        //most of decisionmaking is based off winChance and risk as a cost vs benefit, with additional variance introduced by currentSpice value and ai player profile
        //callUpTo and RaiseUpTo values, and thresholds for fold and all in determined based on winChance, risk, spice, and AI personality factors
        //example: a standard
        throw new NotImplementedException;

    }


}
