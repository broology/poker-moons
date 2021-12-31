import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateTableRequest } from '@poker-moons/shared/type';

@Component({
    selector: 'poker-moons-frontend-builder-form-ui',
    templateUrl: './frontend-builder-form-ui.component.html',
    styleUrls: ['./frontend-builder-form-ui.component.scss'],
})
export class FrontendBuilderFormUiComponent implements OnInit {
    TABLE_NAME_LENGTH = { min: 3, max: 25 };

    @Input() loading!: boolean;

    @Output() createTableEmitter: EventEmitter<CreateTableRequest>;

    builderForm!: FormGroup;

    get nameControl(): FormControl {
        return this.builderForm.get('name') as FormControl;
    }

    constructor() {
        this.createTableEmitter = new EventEmitter();
    }

    ngOnInit(): void {
        this.builderForm = new FormGroup({
            name: new FormControl(
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(this.TABLE_NAME_LENGTH.min),
                    Validators.maxLength(this.TABLE_NAME_LENGTH.max),
                ]),
            ),
        });
    }

    submit(): void {
        if (this.builderForm.valid) {
            this.createTableEmitter.emit({ name: this.nameControl.value });
        } else {
            this.builderForm.markAllAsTouched();
        }
    }
}
