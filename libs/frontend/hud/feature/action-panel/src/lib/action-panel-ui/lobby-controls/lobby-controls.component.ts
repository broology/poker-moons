import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * @description The status of the lobby for simply switch mapping in ui.
 *
 * - `notReady`: The client hasn't readied yet
 * - `ready`: The client has readied, but not everyone else is ready yet.
 * - `gameStarting`: Every one is ready, and the game is starting
 *
 */
type LobbyStatus = 'notReady' | 'ready' | 'gameStarting';

@Component({
    selector: 'poker-moons-lobby-controls',
    templateUrl: './lobby-controls.component.html',
    styleUrls: ['./lobby-controls.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LobbyControlsComponent {
    /**
     * @description Whether the client player has readied them selfs or not
     */
    @Input() ready!: boolean;

    /**
     * @description If all players are ready, this is the date at which the game will start in UTC.
     *              Otherwise, is null
     */
    @Input() startDate!: Date | null;

    /**
     * @description Emitter to tell the parent component the user has clicked the toggle ready button.
     */
    @Output() toggleReadyStatusEmitter = new EventEmitter<void>();

    /**
     * @description Given the component inputs, determines the {@link LobbyStatus}.
     */
    get status(): LobbyStatus {
        if (this.startDate) {
            return 'gameStarting';
        }

        if (this.ready) {
            return 'ready';
        }

        return 'notReady';
    }

    toggleReadyStatus(): void {
        this.toggleReadyStatusEmitter.emit();
    }
}
