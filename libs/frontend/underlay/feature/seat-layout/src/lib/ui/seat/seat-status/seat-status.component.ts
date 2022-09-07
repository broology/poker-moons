import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MutablePublicPlayer, TableStatus } from '@poker-moons/shared/type';

/**
 * @description The status of the seat, which will determine what is displayed.
 *
 * - `empty`: hidden.
 * - `lobby`: Display ready or not ready.
 * - `active`: The players last action.
 */
type SeatStatus = 'empty' | 'lobby' | 'active';

@Component({
    selector: 'poker-moons-seat-status',
    templateUrl: './seat-status.component.html',
    styleUrls: ['./seat-status.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatStatusComponent {
    /**
     * @description The status of the table.
     */
    @Input() tableStatus!: TableStatus;

    /**
     * @description The mutable data fo the player in the seat.
     */
    @Input() mutablePlayer!: MutablePublicPlayer | null;

    /**
     * @description Determines the `SeatStatus` given the component inputs.
     */
    get status(): SeatStatus {
        if (!this.mutablePlayer) {
            return 'empty';
        }

        if (this.tableStatus === 'lobby') {
            return 'lobby';
        }

        return 'active';
    }
}
