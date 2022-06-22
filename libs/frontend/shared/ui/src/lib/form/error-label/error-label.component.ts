import { Component, Input } from '@angular/core';

@Component({
    selector: 'poker-moons-error-label',
    templateUrl: './error-label.component.html',
    styleUrls: ['./error-label.component.scss'],
})
export class ErrorLabelComponent {
    @Input() error?: string;
}
