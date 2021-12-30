import { Round } from '@poker-moons/shared/type';
import { merge } from '@poker-moons/shared/util';
import { DeepPartial } from 'ts-essentials';

/**
 * @default "Mocks the start of a round after blinds have been set.""
 */
export function mockRound(overrides: DeepPartial<Round> = {}): Round {
    const round: Round = {
        pot: 150,
        roundStatus: 'deal',
        smallBlind: 50,
        activeSeat: 0,
        dealerSeat: 1,
        toCall: 100,
        turnCount: 0,
        cards: [],
    };

    return merge(round, overrides);
}
