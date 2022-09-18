import {
    hasBiddingCycleEnded,
    hasEveryoneButOneFolded,
    hasEveryoneTakenTurn,
    incrementRoundStatus,
    incrementSeat,
    isRoundComplete,
} from './round.util';

describe('Round Utils', () => {
    describe('isRoundComplete', () => {
        it('should return true if everyone excect for one player has folded', () => {
            expect(isRoundComplete('flop', ['raised', 'folded', 'folded', 'folded'])).toEqual(true);
        });

        it('should return true if its the river and one player has raised and everyone else has either called or folded', () => {
            expect(isRoundComplete('river', ['raised', 'called', 'folded', 'folded'])).toEqual(true);
        });

        it('should return true if its the river and one player has gone all-in and everyone else has either called or folded', () => {
            expect(isRoundComplete('river', ['folded', 'called', 'all-in', 'folded'])).toEqual(true);
        });

        it('should return true if its the river and everyone checks', () => {
            expect(isRoundComplete('river', ['checked', 'checked', 'checked', 'checked'])).toEqual(true);
        });

        it('should return true if everyone is folded', () => {
            expect(isRoundComplete('turn', ['folded', 'folded'])).toEqual(true);
        });

        it('should return false if none of the above are true', () => {
            expect(isRoundComplete('turn', ['raised', 'called', 'called', 'folded'])).toEqual(false);
        });
    });

    describe('incrementSeat', () => {
        it('should increment seat', () => {
            expect(incrementSeat(0, { 0: 'player_0', 1: 'player_1' })).toEqual(1);
        });

        it('should skip empty seats when incrementing', () => {
            expect(incrementSeat(0, { 0: 'player_0', 2: 'player_2' })).toEqual(2);
        });

        it('should return 0 if 5 is passed in', () => {
            expect(incrementSeat(5, { 0: 'player_0', 2: 'player_2', 5: 'player_5' })).toEqual(0);
        });

        it('should skip empty seats when 5 is passed in', () => {
            expect(incrementSeat(5, { 2: 'player_2', 5: 'player_5' })).toEqual(2);
        });
    });

    describe('incrementRoundStatus', () => {
        it('should increment from deal to flop', () => {
            expect(incrementRoundStatus('deal')).toEqual('flop');
        });

        it('should increment from flop to turn', () => {
            expect(incrementRoundStatus('flop')).toEqual('turn');
        });

        it('should increment from turn to river', () => {
            expect(incrementRoundStatus('turn')).toEqual('river');
        });

        it('should increment from river back to deal', () => {
            expect(incrementRoundStatus('river')).toEqual('deal');
        });
    });

    describe('hasEveryoneTakenTurn', () => {
        it('should return true if everyone has taken their turn', () => {
            expect(hasEveryoneTakenTurn(['raised', 'called', 'folded'])).toEqual(true);
        });

        it('should return false if not everyone has taken their turn', () => {
            expect(hasEveryoneTakenTurn(['raised', 'called', 'waiting'])).toEqual(false);
        });
    });

    describe('hasEveryoneButOneFolded', () => {
        it('should return true if everyone except one player has folded', () => {
            expect(hasEveryoneButOneFolded(['folded', 'waiting', 'folded'])).toEqual(true);
        });

        it('should return false if not everyone but one folded', () => {
            expect(hasEveryoneButOneFolded(['raised', 'called', 'folded'])).toEqual(false);
        });
    });

    describe('hasBiddingCycleEnded', () => {
        it('should return true if all players are folded', () => {
            expect(
                hasBiddingCycleEnded(
                    [
                        { status: 'folded', biddingCycleCalled: 0 },
                        { status: 'folded', biddingCycleCalled: 0 },
                    ],
                    { toCall: 10 },
                ),
            ).toEqual(true);
        });

        it('should return true if all players are all in', () => {
            expect(
                hasBiddingCycleEnded(
                    [
                        { status: 'all-in', biddingCycleCalled: 0 },
                        { status: 'all-in', biddingCycleCalled: 0 },
                    ],
                    { toCall: 10 },
                ),
            ).toEqual(true);
        });

        it('should return true if all players match the to call', () => {
            expect(
                hasBiddingCycleEnded(
                    [
                        { status: 'raised', biddingCycleCalled: 30 },
                        { status: 'called', biddingCycleCalled: 30 },
                    ],
                    { toCall: 30 },
                ),
            ).toEqual(true);
        });

        it('should return false if any player is waiting', () => {
            expect(
                hasBiddingCycleEnded(
                    [
                        { status: 'waiting', biddingCycleCalled: 0 },
                        { status: 'all-in', biddingCycleCalled: 0 },
                    ],
                    { toCall: 10 },
                ),
            ).toEqual(false);
        });

        it('should return false if any player is under to call amount', () => {
            expect(
                hasBiddingCycleEnded(
                    [
                        { status: 'raised', biddingCycleCalled: 30 },
                        { status: 'called', biddingCycleCalled: 10 },
                    ],
                    { toCall: 30 },
                ),
            ).toEqual(false);
        });
    });
});
