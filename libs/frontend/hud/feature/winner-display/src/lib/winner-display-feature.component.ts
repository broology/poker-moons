import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableStateFacade } from '@poker-moons/frontend/shared/state/table';

@Component({
    selector: 'poker-moons-winner-display-feature',
    templateUrl: './winner-display-feature.component.html',
    styleUrls: ['./winner-display-feature.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WinnerDisplayFeatureComponent {
    readonly winners$ = this.tableStateFacade.selectWinners();

    constructor(private readonly tableStateFacade: TableStateFacade) {}
}
