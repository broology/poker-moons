import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RoundStatus, TableStatus } from '@poker-moons/shared/type';

type TableDisplayStatus = 'lobby' | 'bidding' | 'game-end';

@Component({
    selector: 'poker-moons-table-display-status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusComponent {
    /**
     * @description The total contributed to the pot, including the active bid cycle.
     */
    @Input() pot!: number;

    /**
     * @description The active status of the round.
     */
    @Input() roundStatus!: RoundStatus;

    /**
     * @description The active status of the table.
     */
    @Input() tableStatus!: TableStatus;

    get status(): TableDisplayStatus {
        if (this.tableStatus === 'ended') {
            return 'game-end';
        }

        if (this.tableStatus === 'lobby') {
            return 'lobby';
        }

        return 'bidding';
    }
}
