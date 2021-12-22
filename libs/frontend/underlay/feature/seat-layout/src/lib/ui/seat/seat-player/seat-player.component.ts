import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ImmutablePublicPlayer } from '@poker-moons/shared/type';

@Component({
    selector: 'poker-moons-seat-player',
    templateUrl: './seat-player.component.html',
    styleUrls: ['./seat-player.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatPlayerComponent {
    @Input() immutablePlayer!: ImmutablePublicPlayer | null;
}
