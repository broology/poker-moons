import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableStateFacade } from '@poker-moons/frontend/shared/state/table';

@Component({
    selector: 'poker-moons-table-display-feature',
    templateUrl: './table-display-feature.component.html',
    styleUrls: ['./table-display-feature.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableDisplayFeatureComponent {
    readonly round$ = this.tableStateFacade.selectRound();

    constructor(private readonly tableStateFacade: TableStateFacade) {}
}
