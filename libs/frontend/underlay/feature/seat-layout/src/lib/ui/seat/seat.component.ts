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
    @Input() seatId!: SeatId;

    readonly mutablePlayer$ = this.tableStateFacade.selectMutablePlayerBySeatId(this.seatId);

    readonly immutablePlayer$ = this.tableStateFacade.selectImmutablePlayerBySeatId(this.seatId);

    constructor(private readonly tableStateFacade: TableStateFacade) {}
}
