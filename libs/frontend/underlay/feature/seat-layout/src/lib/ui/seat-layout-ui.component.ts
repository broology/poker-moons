import { Component, Input } from '@angular/core';
import { SeatId, seats } from '@poker-moons/shared/type';

@Component({
    selector: 'poker-moons-seat-layout-ui',
    templateUrl: './seat-layout-ui.component.html',
    styleUrls: ['./seat-layout-ui.component.scss'],
})
export class SeatLayoutUiComponent {
    @Input() set clientSeatId(seatId: SeatId | undefined | null) {
        this.playerSeatIds = this.shiftPlayerSeatIdsBasedOnClient(seatId);
    }

    /**
     * The seats are the normalized seatId for which player is in the seat.
     *
     * Use this seatId to pull the player who should be sitting here at the table.
     */
    playerSeatIds = [...seats];

    /**
     * The seats which are being displayed.
     *
     * Use this seatId to perform styling calculations relative to the table rotation
     */
    displaySeatIds = [...seats];

    /**
     * Shifts the seats displayed so that the client seatId always remains at the bottom.
     */
    private shiftPlayerSeatIdsBasedOnClient(clientSeatId: SeatId | undefined | null): SeatId[] {
        if (!clientSeatId) {
            return [...seats];
        }
        const playerSeatIds: SeatId[] = [];

        for (const seatId of seats) {
            const idx = (seatId + clientSeatId) % seats.length;

            playerSeatIds.push(idx as SeatId);
        }

        return playerSeatIds;
    }
}
