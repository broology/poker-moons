import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ImmutablePublicPlayer } from '@poker-moons/shared/type';

@Component({
    selector: 'poker-moons-seat-player',
    templateUrl: './seat-player.component.html',
    styleUrls: ['./seat-player.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatPlayerComponent {
    DEFAULT_PLAYER_IMG = '/default-profile-img.jpg';

    @Input() immutablePlayer!: ImmutablePublicPlayer | null;
}
