import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ImmutablePublicPlayer, MutablePublicPlayer, Round } from '@poker-moons/shared/type';

@Component({
    selector: 'poker-moons-seat',
    templateUrl: './seat.component.html',
    styleUrls: ['./seat.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatComponent {
    @Input() activeRound!: Round;

    @Input() mutablePlayer!: MutablePublicPlayer;

    @Input() immutablePlayer!: ImmutablePublicPlayer;
}
