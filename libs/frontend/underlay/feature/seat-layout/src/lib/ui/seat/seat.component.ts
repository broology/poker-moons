import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ImmutablePublicPlayer, MutablePublicPlayer, SeatId } from '@poker-moons/shared/type';

@Component({
    selector: 'poker-moons-seat',
    templateUrl: './seat.component.html',
    styleUrls: ['./seat.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatComponent {
    @Input() seatId!: SeatId;

    @Input() mutablePlayer!: MutablePublicPlayer | null;

    @Input() immutablePlayer!: ImmutablePublicPlayer | null;
}
