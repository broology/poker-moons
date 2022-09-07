import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SeatId } from '@poker-moons/shared/type';

@Component({
    selector: 'poker-moons-table-display-pot',
    templateUrl: './pot.component.html',
    styleUrls: ['./pot.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PotComponent {
    /**
     * @description The number of chips to be displayed in the center of the table. This total excludes to the
     * active bidding cycle.
     */
    @Input() mainPot!: number;

    /**
     * @description The side pots when we have cases of users who all-in and don't have enough to match the pot.
     */
    @Input() sidePots!: { seatId: SeatId; amount: number }[];
}
