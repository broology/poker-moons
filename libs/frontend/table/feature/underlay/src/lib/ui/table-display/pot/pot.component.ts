import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'poker-moons-table-display-pot',
    templateUrl: './pot.component.html',
    styleUrls: ['./pot.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PotComponent {}
