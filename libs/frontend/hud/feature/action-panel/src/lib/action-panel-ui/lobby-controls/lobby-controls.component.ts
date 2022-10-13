import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DialogCopy } from '@poker-moons/frontend/shared/ui';
import { TableId } from '@poker-moons/shared/type';

/**
 * @description The status of the lobby for simply switch mapping in ui.
 *
 * - `notReady`: The client hasn't readied yet.
 * - `ready`: The client has readied, but not everyone else is ready yet.
 * - `gameStarting`: Every one is ready, and the game is starting.
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
     * @description Whether the client player has readied them selfs or not.
     */
    @Input() ready!: boolean;

    /**
     * @description Whether the client has clicked the toggle action and is currently loading.
     */
    @Input() readyLoading!: boolean;

    /**
     * @description If all players are ready, this is the date at which the game will start in UTC. Otherwise, is null.
     */
    @Input() startDate!: Date | null;

    /**
     * @description ID of the table the user is in lobby for.
     */
    @Input() tableId!: TableId | null;

    /**
     * @description Emitter to tell the parent component the user has clicked the toggle ready button.
     */
    @Output() toggleReadyStatusEmitter = new EventEmitter<void>();

    /**
     * @description Input that contains the table url.
     */
    @ViewChild('tableUrlInput') tableUrlInput!: ElementRef;

    readonly dialogCopy: DialogCopy = {
        title: 'Share this link with others to play!',
        primaryButton: 'COPY',
        secondaryButton: 'CLOSE',
    };

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

    /**
     * @description Copies the table url to the users clipboard.
     */
    copyTableUrl(): void {
        const input = this.tableUrlInput.nativeElement;

        /* Select the text field */
        input.select();
        input.setSelectionRange(0, 99999); /* For mobile devices */

        navigator.clipboard.writeText(input.value);
    }

    toggleReadyStatus(): void {
        this.toggleReadyStatusEmitter.emit();
    }

    closeShareDialog(): void {
        const element = document.getElementById('share-game-dialog');
        element?.remove();
    }
}
