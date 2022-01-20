import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableStateFacade } from '@poker-moons/frontend/shared/state/table';
@Component({
    selector: 'poker-moons-seat-layout-feature',
    templateUrl: './seat-layout-feature.component.html',
    styleUrls: ['./seat-layout-feature.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatLayoutFeatureComponent {
    clientSeatId$ = this.tableStateFacade.selectClientSeatId();

    constructor(private readonly tableStateFacade: TableStateFacade) {}
}
