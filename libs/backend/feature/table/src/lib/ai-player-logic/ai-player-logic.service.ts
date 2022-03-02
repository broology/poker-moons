import { Injectable, NotImplementedException } from '@nestjs/common'
import { Card, PlayerAction, AIPlayer, Table, Round, CheckPlayerAction, CallPlayerAction, FoldPlayerAction, RaisePlayerAction, AllInPlayerAction, playerActions } from "@poker-moons/shared/type";
//import { AIPlayer } from "@poker-moons/shared/type";

@Injectable
export class AIPlayerLogicService{

    evaluateEquity(player: AIPlayer, round: Round): number {
        //Can add more complex logic in the future, but for now a simple blind Expected Value can be used as a placeholder.
        //simplest case can just use rank.ts to determine best 5 card hand available, then take (bestHandRank / totalRanks) to find percentage of beating an arbitrary hand
        //remove own pocket cards from ranking system as no other hands that contain them are possible for other players to have
        //then add a small fudge factor because players have 7 cards to choose from as well, so they have more than one hand to choose from, so no player will take their worst hand
        //ideally, compare bestHandRank to pool of possible hands constructed from available final card pools and check relative standing
        //winChance = (bestHandRank) / (numberofPossibleHandsWithoutOwnCards)
        //if winChance > (1/numPlayersActive), standard AI personality assumes it is favoured to win the round
        throw new NotImplementedException;
    }

    decideRaiseAmount(player: AIPlayer, round: Round): number {
        //used to determine the amount of chips the ai player will raise up to if it performs that action
        //if <=0, standard AI will only check if available, or fold otherwise
        //specific personalities can cause an AI player to bet more/less than the standard raiseUpTo value, after that threshold has been passed and raising initiated (Big Better, Low Stakesetter)
        //should also note if a raise will put themself or other players all in, and have factors that can influence the decision based on that (Survivor is averse to going all in, Bloodthirsty wants to put others all in)
        throw new NotImplementedException;

    }

    decideAction(player: AIPlayer, round: Round): PlayerAction {
        //Use equity as core factor to determine whether to check, call, raise, or fold
        const equity = this.evaluateEquity(player, round);
        //Generate random number as random variance spice value, based off AIPlayer difficulty/personality settings
        //This represents the deviation from what the ai considers "optimal" play that the ai will accept this round (can be + or -).
        //Higher difficulty AI should have a smaller difficulty factor, leading to more consistently "correct" play
        let currentSpice = Math.random() * player.difficultyFactor;
        const currentSpiceCardinality = Math.random();
        if(currentSpiceCardinality > 0.5) {
            currentSpice *= -1;
            if(player.personalityTraits.includes("Passive")) {
                currentSpice *= 2;
            }
            else if(player.personalityTraits.includes("Risky")) {
                currentSpice /= 2;
            }
        }
        else if(player.personalityTraits.includes("Passive")) {
            currentSpice /= 2;
        }
        else if(player.personalityTraits.includes("Risky")) {
            currentSpice *= 2;
        }

        //Augmenting factors
        //Player can be up to 5% more likely to call a bet if they are deeply invested in the pot this round (this is probably not a good strategy, but it adds variety to the AI behaviour)
        //TODO:Should all AI players account for this, or only ones with a specific personality (should this factor be considered when determining raise size, or only call vs fold determination?)
        const sunkenCostFactor = (player.called / player.stack) * 5
        //if round.toCall == player.called, then check is an option.
        //base calculation uses equity and pot odds to determine EV of calling
        //TODO: Make sure to also account for sidepots if they exist
        const expectedValue = (round.toCall / (round.toCall + round.pot));
        //compare this expected value against our calculated equity to determine whether this is a positive or negative EV play
        //then, if positive enough to warrant a raise, calculate the optimal pot odds to match our expectations based on equity (bigBetter personality augments raise size)
        //TODO: Should currentSpice be relative to the expectedValue, or an absolute percentage?
        if((expectedValue + (expectedValue * currentSpice)) <= equity) {
            //player checks if that's an option, and folds otherwise
            if(round.toCall == player.called) {
                //check
                throw new NotImplementedException;
            }
            else {
                //fold
                throw new NotImplementedException;
            }
        }
        else {
            //recalculate pot odds based on desired equity play
            let desiredRaise = this.decideRaiseAmount(player, round);
            if(desiredRaise > 0) {
                //raise
                throw new NotImplementedException;
            }
            else {
                //call
                throw new NotImplementedException;
            }
        }
    }


}
