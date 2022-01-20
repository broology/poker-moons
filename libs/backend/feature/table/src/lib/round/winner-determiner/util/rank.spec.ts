import { mockCard } from '@poker-moons/shared/testing';
import { PlayerWithHand, RankHandReponse } from '../winner-determiner.types';
import { compareHands, rankHand } from './rank';

describe('Rank Utility Functions', () => {
    describe('compareHands', () => {
        it('should return the hand with the highest score', () => {
            const players: PlayerWithHand[] = [
                {
                    id: 'player_1',
                    username: 'Levi',
                    hand: [
                        mockCard({ suit: 'clubs', rank: '4' }),
                        mockCard({ suit: 'spades', rank: '4' }),
                        mockCard({ suit: 'clubs', rank: '8' }),
                        mockCard({ suit: 'diamonds', rank: '2' }),
                        mockCard({ suit: 'spades', rank: '4' }),
                    ],
                },
                {
                    id: 'player_2',
                    username: 'Bob',
                    hand: [
                        mockCard({ suit: 'clubs', rank: '4' }),
                        mockCard({ suit: 'clubs', rank: '5' }),
                        mockCard({ suit: 'clubs', rank: '8' }),
                        mockCard({ suit: 'clubs', rank: '2' }),
                        mockCard({ suit: 'clubs', rank: '11' }),
                    ],
                },
                {
                    id: 'player_3',
                    username: 'John',
                    hand: [
                        mockCard({ suit: 'clubs', rank: '4' }),
                        mockCard({ suit: 'spades', rank: '5' }),
                        mockCard({ suit: 'diamonds', rank: '13' }),
                        mockCard({ suit: 'diamonds', rank: '14' }),
                        mockCard({ suit: 'clubs', rank: '11' }),
                    ],
                },
            ];

            const result = compareHands(players);

            expect(result).toEqual<RankHandReponse[]>([
                {
                    player: {
                        id: 'player_2',
                        username: 'Bob',
                        hand: [
                            mockCard({ suit: 'clubs', rank: '4' }),
                            mockCard({ suit: 'clubs', rank: '5' }),
                            mockCard({ suit: 'clubs', rank: '8' }),
                            mockCard({ suit: 'clubs', rank: '2' }),
                            mockCard({ suit: 'clubs', rank: '11' }),
                        ],
                    },
                    category: 'flush',
                    score: 600 + 4 + 5 + 8 + 2 + 11,
                },
            ]);
        });

        it('should return multiple hands if they have an identical score', () => {
            const players: PlayerWithHand[] = [
                {
                    id: 'player_1',
                    username: 'Levi',
                    hand: [
                        mockCard({ suit: 'clubs', rank: '4' }),
                        mockCard({ suit: 'spades', rank: '4' }),
                        mockCard({ suit: 'clubs', rank: '8' }),
                        mockCard({ suit: 'diamonds', rank: '2' }),
                        mockCard({ suit: 'spades', rank: '4' }),
                    ],
                },
                {
                    id: 'player_2',
                    username: 'Bob',
                    hand: [
                        mockCard({ suit: 'clubs', rank: '4' }),
                        mockCard({ suit: 'clubs', rank: '5' }),
                        mockCard({ suit: 'clubs', rank: '6' }),
                        mockCard({ suit: 'clubs', rank: '7' }),
                        mockCard({ suit: 'diamonds', rank: '8' }),
                    ],
                },
                {
                    id: 'player_3',
                    username: 'John',
                    hand: [
                        mockCard({ suit: 'diamonds', rank: '4' }),
                        mockCard({ suit: 'diamonds', rank: '5' }),
                        mockCard({ suit: 'diamonds', rank: '6' }),
                        mockCard({ suit: 'diamonds', rank: '7' }),
                        mockCard({ suit: 'spades', rank: '8' }),
                    ],
                },
            ];

            const result = compareHands(players);

            expect(result).toEqual<RankHandReponse[]>([
                {
                    player: {
                        id: 'player_2',
                        username: 'Bob',
                        hand: [
                            mockCard({ suit: 'clubs', rank: '4' }),
                            mockCard({ suit: 'clubs', rank: '5' }),
                            mockCard({ suit: 'clubs', rank: '6' }),
                            mockCard({ suit: 'clubs', rank: '7' }),
                            mockCard({ suit: 'diamonds', rank: '8' }),
                        ],
                    },
                    category: 'straight',
                    score: 500 + 4 + 5 + 6 + 7 + 8,
                },
                {
                    player: {
                        id: 'player_3',
                        username: 'John',
                        hand: [
                            mockCard({ suit: 'diamonds', rank: '4' }),
                            mockCard({ suit: 'diamonds', rank: '5' }),
                            mockCard({ suit: 'diamonds', rank: '6' }),
                            mockCard({ suit: 'diamonds', rank: '7' }),
                            mockCard({ suit: 'spades', rank: '8' }),
                        ],
                    },
                    category: 'straight',
                    score: 500 + 4 + 5 + 6 + 7 + 8,
                },
            ]);
        });
    });

    describe('rankHand', () => {
        it('should return high card with a score of 100 + value of card', () => {
            const player: PlayerWithHand = {
                id: 'player_1',
                username: 'Levi',
                hand: [
                    mockCard({ suit: 'clubs', rank: '4' }),
                    mockCard({ suit: 'spades', rank: '7' }),
                    mockCard({ suit: 'clubs', rank: '8' }),
                    mockCard({ suit: 'diamonds', rank: '2' }),
                    mockCard({ suit: 'spades', rank: '12' }),
                ],
            };

            const result = rankHand(player);

            expect(result).toEqual<RankHandReponse>({
                player,
                category: 'high card',
                score: 100 + 12,
            });
        });

        it('should return pair with a score of 200 + value of cards', () => {
            const player: PlayerWithHand = {
                id: 'player_1',
                username: 'Levi',
                hand: [
                    mockCard({ suit: 'clubs', rank: '4' }),
                    mockCard({ suit: 'spades', rank: '4' }),
                    mockCard({ suit: 'clubs', rank: '8' }),
                    mockCard({ suit: 'diamonds', rank: '2' }),
                    mockCard({ suit: 'spades', rank: '12' }),
                ],
            };

            const result = rankHand(player);

            expect(result).toEqual<RankHandReponse>({
                player,
                category: 'pair',
                score: 200 + 4 + 4,
            });
        });

        it('should return two pair with a score of 300 + value of cards', () => {
            const player: PlayerWithHand = {
                id: 'player_1',
                username: 'Levi',
                hand: [
                    mockCard({ suit: 'clubs', rank: '4' }),
                    mockCard({ suit: 'spades', rank: '4' }),
                    mockCard({ suit: 'clubs', rank: '8' }),
                    mockCard({ suit: 'diamonds', rank: '8' }),
                    mockCard({ suit: 'spades', rank: '12' }),
                ],
            };

            const result = rankHand(player);

            expect(result).toEqual<RankHandReponse>({
                player,
                category: 'two pairs',
                score: 300 + 4 + 4 + 8 + 8,
            });
        });

        it('should return three of a kind with a score of 400 + value of cards', () => {
            const player: PlayerWithHand = {
                id: 'player_1',
                username: 'Levi',
                hand: [
                    mockCard({ suit: 'clubs', rank: '4' }),
                    mockCard({ suit: 'spades', rank: '4' }),
                    mockCard({ suit: 'clubs', rank: '8' }),
                    mockCard({ suit: 'diamonds', rank: '2' }),
                    mockCard({ suit: 'spades', rank: '4' }),
                ],
            };

            const result = rankHand(player);

            expect(result).toEqual<RankHandReponse>({
                player,
                category: 'three of a kind',
                score: 400 + 4 + 4 + 4,
            });
        });

        it('should return straight with a score of 500  + value of cards', () => {
            const player: PlayerWithHand = {
                id: 'player_1',
                username: 'Levi',
                hand: [
                    mockCard({ suit: 'clubs', rank: '4' }),
                    mockCard({ suit: 'spades', rank: '5' }),
                    mockCard({ suit: 'clubs', rank: '6' }),
                    mockCard({ suit: 'diamonds', rank: '7' }),
                    mockCard({ suit: 'spades', rank: '8' }),
                ],
            };

            const result = rankHand(player);

            expect(result).toEqual<RankHandReponse>({
                player,
                category: 'straight',
                score: 500 + 4 + 5 + 6 + 7 + 8,
            });
        });

        it('should return flush with a score of 600 + value of cards', () => {
            const player: PlayerWithHand = {
                id: 'player_1',
                username: 'Levi',
                hand: [
                    mockCard({ suit: 'clubs', rank: '4' }),
                    mockCard({ suit: 'clubs', rank: '5' }),
                    mockCard({ suit: 'clubs', rank: '6' }),
                    mockCard({ suit: 'clubs', rank: '7' }),
                    mockCard({ suit: 'clubs', rank: '13' }),
                ],
            };

            const result = rankHand(player);

            expect(result).toEqual<RankHandReponse>({
                player,
                category: 'flush',
                score: 600 + 4 + 5 + 6 + 7 + 13,
            });
        });

        it('should return full house with a score of 700 + value of cards', () => {
            const player: PlayerWithHand = {
                id: 'player_1',
                username: 'Levi',
                hand: [
                    mockCard({ suit: 'clubs', rank: '4' }),
                    mockCard({ suit: 'diamonds', rank: '4' }),
                    mockCard({ suit: 'spades', rank: '4' }),
                    mockCard({ suit: 'clubs', rank: '7' }),
                    mockCard({ suit: 'diamonds', rank: '7' }),
                ],
            };

            const result = rankHand(player);

            expect(result).toEqual<RankHandReponse>({
                player,
                category: 'full house',
                score: 700 + 4 + 4 + 4 + 7 + 7,
            });
        });

        it('should return four of a kind with a score of 800 + value of cards', () => {
            const player: PlayerWithHand = {
                id: 'player_1',
                username: 'Levi',
                hand: [
                    mockCard({ suit: 'clubs', rank: '4' }),
                    mockCard({ suit: 'diamonds', rank: '4' }),
                    mockCard({ suit: 'spades', rank: '4' }),
                    mockCard({ suit: 'hearts', rank: '4' }),
                    mockCard({ suit: 'diamonds', rank: '7' }),
                ],
            };

            const result = rankHand(player);

            expect(result).toEqual<RankHandReponse>({
                player,
                category: 'four of a kind',
                score: 800 + 4 + 4 + 4 + 4,
            });
        });

        it('should return straight flush with a score of 900 + value of cards', () => {
            const player: PlayerWithHand = {
                id: 'player_1',
                username: 'Levi',
                hand: [
                    mockCard({ suit: 'clubs', rank: '4' }),
                    mockCard({ suit: 'clubs', rank: '5' }),
                    mockCard({ suit: 'clubs', rank: '6' }),
                    mockCard({ suit: 'clubs', rank: '7' }),
                    mockCard({ suit: 'clubs', rank: '8' }),
                ],
            };

            const result = rankHand(player);

            expect(result).toEqual<RankHandReponse>({
                player,
                category: 'straight flush',
                score: 900 + 4 + 5 + 6 + 7 + 8,
            });
        });

        it('should return royal flush with a score of 1000 + value of cards', () => {
            const player: PlayerWithHand = {
                id: 'player_1',
                username: 'Levi',
                hand: [
                    mockCard({ suit: 'clubs', rank: '10' }),
                    mockCard({ suit: 'clubs', rank: '11' }),
                    mockCard({ suit: 'clubs', rank: '12' }),
                    mockCard({ suit: 'clubs', rank: '13' }),
                    mockCard({ suit: 'clubs', rank: '14' }),
                ],
            };

            const result = rankHand(player);

            expect(result).toEqual<RankHandReponse>({
                player,
                category: 'royal flush',
                score: 1000 + 10 + 11 + 12 + 13 + 14,
            });
        });
    });
});
