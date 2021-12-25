import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'poker-moons-table-display-status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusComponent {}
