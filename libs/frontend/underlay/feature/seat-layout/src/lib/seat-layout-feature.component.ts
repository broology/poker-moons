import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableStateFacade } from '@poker-moons/frontend/shared/state/table';
@Component({
    selector: 'poker-moons-seat-layout-feature',
    templateUrl: './seat-layout-feature.component.html',
    styleUrls: ['./seat-layout-feature.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatLayoutFeatureComponent {
    readonly seatMap$ = this.tableStateFacade.selectSeatMap();

    readonly mutablePlayerMap$ = this.tableStateFacade.selectMutablePlayerMap();

    readonly immutablePlayerMap$ = this.tableStateFacade.selectImmutablePlayerMap();

    constructor(private readonly tableStateFacade: TableStateFacade) {}
}
