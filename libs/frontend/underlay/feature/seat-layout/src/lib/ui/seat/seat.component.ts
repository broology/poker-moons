import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TableStateFacade } from '@poker-moons/frontend/shared/state/table';
import { SeatId } from '@poker-moons/shared/type';

@Component({
    selector: 'poker-moons-seat',
    templateUrl: './seat.component.html',
    styleUrls: ['./seat.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatComponent {
    /**
     * The seat which is being displayed.
     *
     * Use this seatId to perform styling calculations relative to the table rotation
     */
    @Input() displaySeatId!: SeatId;

    /**
     * The player's seat index.
     *
     * Use this seatId to pull the player who should be sitting here at the table.
     */
    @Input() playerSeatId!: SeatId;

    readonly mutablePlayer$ = this.tableStateFacade.selectMutablePlayerBySeatId(this.playerSeatId);

    readonly immutablePlayer$ = this.tableStateFacade.selectImmutablePlayerBySeatId(this.playerSeatId);

    constructor(private readonly tableStateFacade: TableStateFacade) {}
}
