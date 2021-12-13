import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'poker-moons-table-display',
    templateUrl: './table-display.component.html',
    styleUrls: ['./table-display.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableDisplayComponent {}
