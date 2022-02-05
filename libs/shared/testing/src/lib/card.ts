import { merge } from '@poker-moons/shared/util';
import { Card } from '@poker-moons/shared/type';
import { DeepPartial } from 'ts-essentials';

export function mockCard(overrides: DeepPartial<Card> = {}): Card {
    const card: Card = {
        suit: 'clubs',
        rank: '10',
    };

    return merge(card, overrides);
}
