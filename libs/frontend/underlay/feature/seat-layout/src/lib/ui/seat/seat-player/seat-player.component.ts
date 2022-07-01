import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ImmutablePublicPlayer, MutablePublicPlayer, SeatId } from '@poker-moons/shared/type';

@Component({
    selector: 'poker-moons-seat-player',
    templateUrl: './seat-player.component.html',
    styleUrls: ['./seat-player.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatPlayerComponent {
    DEFAULT_PLAYER_IMG = '/default-profile-img.jpg';

    @Input() set activeSeatId(seatId: SeatId | null) {
        if (this.immutablePlayer) {
            if (seatId === this.immutablePlayer.seatId) {
                this.active = true;
            }
        }
        this.active = false;
    }

    @Input() immutablePlayer!: ImmutablePublicPlayer | null;

    @Input() mutablePlayer!: MutablePublicPlayer | null;

    active = false;
}
