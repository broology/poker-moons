import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {
    ImmutablePublicPlayer,
    JoinTableRequest,
    MutablePublicPlayer,
    PlayerAction,
    Round,
    TableStatus,
} from '@poker-moons/shared/type';

type ActionPanelDisplayView = 'active' | 'in-active' | 'lobby' | 'spectator';

@Component({
    selector: 'poker-moons-action-panel-ui',
    templateUrl: './action-panel-ui.component.html',
    styleUrls: ['./action-panel-ui.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionPanelUiComponent {
    @Input() clientImmutablePlayer!: ImmutablePublicPlayer | null;

    @Input() clientMutablePlayer!: MutablePublicPlayer | null;

    @Input() round!: Round;

    @Input() tableStartDate!: Date | null;

    @Input() tableStatus!: TableStatus;

    @Output() readonly joinTableEmitter = new EventEmitter<JoinTableRequest>();

    @Output() readonly leaveTableEmitter = new EventEmitter<void>();

    @Output() readonly playerActionEmitter = new EventEmitter<PlayerAction>();

    @Output() readonly toggleReadyStatusEmitter = new EventEmitter<void>();

    /**
     * Determines the `ActivePanelDisplayView` for what to render on the UI
     */
    get displayView(): ActionPanelDisplayView {
        if (this.clientImmutablePlayer == null) {
            return 'spectator';
        }

        if (this.round.activeSeat === this.clientImmutablePlayer.seatId) {
            return 'active';
        }

        if (this.tableStatus === 'lobby') {
            return 'lobby';
        }

        return 'in-active';
    }
}
