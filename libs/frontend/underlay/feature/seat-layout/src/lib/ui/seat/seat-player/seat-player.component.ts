import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ImmutablePublicPlayer, MutablePublicPlayer, SeatId} from '@poker-moons/shared/type';

@Component({
    selector: 'poker-moons-seat-player',
    templateUrl: './seat-player.component.html',
    styleUrls: ['./seat-player.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatPlayerComponent {

    @Input() dealerSeatId!: number | null;
    @Input() bigBlindSeatId!: number | null;
    @Input() smallBlindSeatId!: number | null;

    /**
     * @description The immutable data of the player in this seat.
     */
    @Input() immutablePlayer!: ImmutablePublicPlayer | null;

    /**
     * @description The mutable data of the player in this seat.
     */
    @Input() mutablePlayer!: MutablePublicPlayer | null;

    /**
     * @description True if this player is currently the active seat at the table.
     */
    active = false;

    /**
     * @description Setter to determine if this seat is currently the active seat.
     */
    @Input() set activeSeatId(seatId: SeatId | null) {
        if (this.immutablePlayer) {
            if (seatId === this.immutablePlayer.seatId) {
                this.active = true;
                return;
            }
        }

        this.active = false;
    }

    /**
     * @description Calculates the players duration.
     *
     * The duration only exists for the active seat.
     */
    getDuration(): number | null {
        if (this.active && this.mutablePlayer) {
            // Time bank + Default turn timer allotment converted into milliseconds.
            return (this.mutablePlayer.timeBank + 30) * 1000;
        }

        return null;
    }

}
