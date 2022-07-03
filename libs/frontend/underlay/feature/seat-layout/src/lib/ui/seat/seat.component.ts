import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TableStateFacade } from '@poker-moons/frontend/shared/state/table';
import { DepthLevel, PlayerOrientation } from '@poker-moons/frontend/shared/ui';
import { ImmutablePublicPlayer, MutablePublicPlayer, SeatId, TableStatus } from '@poker-moons/shared/type';
import { Observable } from 'rxjs';

const displaySeatToPlayerOrientation: Record<SeatId, PlayerOrientation> = {
    0: 'bottom',
    1: 'bottomLeft',
    2: 'topLeft',
    3: 'top',
    4: 'topRight',
    5: 'bottomRight',
};

const displaySeatToDepthLevel: Record<SeatId, DepthLevel> = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 2,
    5: 1,
};

@Component({
    selector: 'poker-moons-seat',
    templateUrl: './seat.component.html',
    styleUrls: ['./seat.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatComponent implements OnChanges {
    /**
     * The seat which is being displayed.
     *
     * Use this seatId to perform styling calculations relative to the table rotation
     */
    @Input() set displaySeatId(seatId: SeatId) {
        this.playerOrientation = displaySeatToPlayerOrientation[seatId];
        this.depthLevel = displaySeatToDepthLevel[seatId];
    }

    /**
     * The player's seat index.
     *
     * Use this seatId to pull the player who should be sitting here at the table.
     */
    @Input() playerSeatId!: SeatId;

    mutablePlayer$!: Observable<MutablePublicPlayer | null>;

    immutablePlayer$!: Observable<ImmutablePublicPlayer | null>;

    activeSeatId$!: Observable<SeatId | null>;

    tableStatus$!: Observable<TableStatus>;

    playerOrientation!: PlayerOrientation;

    depthLevel!: DepthLevel;

    constructor(private readonly tableStateFacade: TableStateFacade) {}

    ngOnChanges({ playerSeatId }: SimpleChanges): void {
        if (playerSeatId.currentValue !== playerSeatId.previousValue) {
            this.mutablePlayer$ = this.tableStateFacade.selectMutablePlayerBySeatId(this.playerSeatId);
            this.immutablePlayer$ = this.tableStateFacade.selectImmutablePlayerBySeatId(this.playerSeatId);
            this.activeSeatId$ = this.tableStateFacade.selectActiveSeatId();
            this.tableStatus$ = this.tableStateFacade.selectStatus();
        }
    }
}
