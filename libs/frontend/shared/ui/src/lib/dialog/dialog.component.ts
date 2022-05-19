import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * @description The data that can be displayed on the dialog
 */
interface DialogCopy {
    /**
     * The main title displayed at the top of the dialog
     */
    title: string;

    /**
     * A secondary title displayed under the main title
     */
    subtitle?: string;

    /**
     * The text displayed in the primary button.
     * _optional_ if not given, no primary button will be displayed
     */
    primaryButton?: string;

    /**
     * The text displayed in the secondary button.
     * _optional_ if not given, no secondary button will be displayed
     */
    secondaryButton?: string;
}

/**
 * @description Generic dialog component that may contain children content for use cases such as forms, etc..
 * 
 * @example
 ```html
    <poker-moons-dialog (primary)="submit()" (secondary)="cancel()">
        <label>Input:</label>    
        <input/>
    </poker-moons-dialog>
 ```
 */
@Component({
    selector: 'poker-moons-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
    /**
     * @description The copy to be displayed on the dialog component
     */
    @Input() copy!: DialogCopy;

    /**
     * @description The event emitter that emits events when the primary button is clicked
     */
    @Output() primary = new EventEmitter<void>();

    /**
     * @description The event emitter that emits events when the secondary button is clicked
     */
    @Output() secondary = new EventEmitter<void>();
}
