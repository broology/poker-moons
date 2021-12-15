import { Component } from '@angular/core';
import { TableStateFacade } from '@poker-moons/frontend/shared/state/table';

@Component({
    selector: 'poker-moons-frontend-table-feature-underlay',
    templateUrl: './frontend-table-feature-underlay.component.html',
    styleUrls: ['./frontend-table-feature-underlay.component.scss'],
})
export class FrontendTableFeatureUnderlayComponent {
    readonly activeRound$ = this.tableStateFacade.selectRound();

    readonly immutablePlayerMap$ = this.tableStateFacade.selectImmutablePlayerMap();

    readonly mutablePlayerMap$ = this.tableStateFacade.selectMutablePlayerMap();

    readonly seatMap$ = this.tableStateFacade.selectSeatList();

    constructor(private readonly tableStateFacade: TableStateFacade) {}
}
