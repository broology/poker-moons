import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableStateFacade } from '@poker-moons/frontend/shared/state/table';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'poker-moons-winner-display-feature',
    templateUrl: './winner-display-feature.component.html',
    styleUrls: ['./winner-display-feature.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WinnerDisplayFeatureComponent {
    private readonly values$ = combineLatest([
        this.tableStateFacade.selectStatus(),
        this.tableStateFacade.selectWinners(),
    ]);

    /**
     * @description The winner dialog is only open if the game has ended, or if the given winners map for the round
     * is not empty.
     */
    readonly open$ = this.values$.pipe(
        map(([status, winners]) => status === 'ended' || Object.values(winners).length > 0),
    );

    readonly title$ = this.values$.pipe(
        map(([status, winners]) => {
            if (status === 'ended') {
                return 'Winner winner chicken dinner!';
            }

            const list = Object.values(winners);

            // Should never happen, but until the winner determinator gets fixed it does happen sometimes
            if (list.length === 0) {
                return 'Apparently we have no winners, that means no losers!!!';
            }

            // When multiple winners with all the same amount.
            if (list.length > 1 && list.every((winner) => winner?.amountWon === list[0]?.amountWon)) {
                return `We have a multi-way tie!`;
            }

            return 'Round has finished.';
        }),
    );

    readonly message$ = this.values$.pipe(
        map(([status, winners]) => {
            if (status === 'ended') {
                return `Thanks for playing!`;
            }

            return Object.values(winners)
                .map(({ displayText }) => displayText)
                .join('\n');
        }),
    );

    constructor(private readonly tableStateFacade: TableStateFacade) {}
}
