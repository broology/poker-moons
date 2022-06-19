import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'poker-moons-text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements AfterViewInit {
    @Input() autofocus = false;

    @Input() placeholder!: string;

    @Input() formControl!: FormControl;

    @ViewChild('textInput') element!: ElementRef<HTMLInputElement>;

    ngAfterViewInit(): void {
        if (this.autofocus) {
            this.element.nativeElement.focus();
        }
    }
}
