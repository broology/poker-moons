import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RoundStatus } from '@poker-moons/shared/type';

@Component({
    selector: 'poker-moons-table-display-status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusComponent {
    @Input() status!: RoundStatus;
}
