import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {
    ImmutablePublicPlayer,
    JoinTableRequest,
    MutablePublicPlayer,
    PlayerAction,
    Round,
} from '@poker-moons/shared/type';

type ActionPanelDisplayView = 'active' | 'in-active' | 'spectator';

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

    @Output() joinTableEmitter: EventEmitter<JoinTableRequest>;

    @Output() leaveTableEmitter: EventEmitter<void>;

    @Output() playerActionEmitter: EventEmitter<PlayerAction>;

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

        return 'in-active';
    }

    constructor() {
        this.joinTableEmitter = new EventEmitter();
        this.leaveTableEmitter = new EventEmitter();
        this.playerActionEmitter = new EventEmitter();
    }
}
