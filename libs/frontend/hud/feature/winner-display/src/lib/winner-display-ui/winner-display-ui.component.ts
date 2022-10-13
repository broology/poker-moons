import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'poker-moons-winner-display-ui',
    templateUrl: './winner-display-ui.component.html',
    styleUrls: ['./winner-display-ui.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WinnerDisplayUiComponent {
    /**
     * @description Whether the winner display should be displayed or not.
     */
    @Input() open!: boolean;

    /**
     * @description The title of the winner display.
     */
    @Input() title!: string;

    /**
     * @description The message to describing the winner(s).
     */
    @Input() message!: string;
}
