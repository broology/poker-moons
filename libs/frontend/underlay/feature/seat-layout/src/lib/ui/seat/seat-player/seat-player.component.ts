import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { TableStateFacade } from '@poker-moons/frontend/shared/state/table';
import { ImmutablePublicPlayer, MutablePublicPlayer, SeatId } from '@poker-moons/shared/type';
import { PlayerId } from '@poker-moons/shared/type';

@Component({
    selector: 'poker-moons-seat-player',
    templateUrl: './seat-player.component.html',
    styleUrls: ['./seat-player.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatPlayerComponent implements OnInit, OnChanges {
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

    dealerSeat: number | undefined;

    bigBlindSeat: number | undefined;

    smallBlindSeat: number | undefined;

    playerMap: Record<PlayerId, ImmutablePublicPlayer> | null;

    constructor(private readonly tableStateFacade: TableStateFacade) {
        this.playerMap = null;
    }

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

    ngOnInit() {
        this.tableStateFacade.selectRound().subscribe(value => {
            this.dealerSeat = value.dealerSeat;
            this.bigBlindSeat = this.getNextSeat(this.dealerSeat.valueOf());
            this.smallBlindSeat = this.getNextSeat(this.getNextSeat(this.dealerSeat.valueOf()));
        });
        this.tableStateFacade.selectImmutablePlayerMap().subscribe(value => {
            this.playerMap = value;
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log('Dealer: ' + this.dealerSeat);
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

    /**
     * @description Gets the next seat id in seat order, ensuring to wrap around the table.
     *
     * @param currentSeat - The seat you want to find the next seat of.
     */
    getNextSeat(currentSeat: number): number {
        if (this.playerMap) {
            let possibleSeatId = currentSeat + 1;
            if (possibleSeatId >= Object.keys(this.playerMap).length) {
                possibleSeatId = 0;
            }
            return possibleSeatId;
        }
        return -100;
    }

}
