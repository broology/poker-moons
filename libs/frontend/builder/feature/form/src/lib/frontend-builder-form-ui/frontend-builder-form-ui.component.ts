import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogCopy } from '@poker-moons/frontend/shared/ui';
import { CreateTableRequest } from '@poker-moons/shared/type';

const TABLE_NAME_LENGTH = { min: 3, max: 25 };

@Component({
    selector: 'poker-moons-frontend-builder-form-ui',
    templateUrl: './frontend-builder-form-ui.component.html',
    styleUrls: ['./frontend-builder-form-ui.component.scss'],
})
export class FrontendBuilderFormUiComponent implements OnInit {
    dialogCopy: DialogCopy = {
        title: 'Create Table',
        primaryButton: 'CREATE',
    };

    @Input() loading!: boolean;

    @Output() createTableEmitter = new EventEmitter<CreateTableRequest>();

    builderForm!: FormGroup;

    error?: string;

    get nameControl(): FormControl {
        return this.builderForm.get('name') as FormControl;
    }

    ngOnInit(): void {
        this.builderForm = new FormGroup({
            name: new FormControl(
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(TABLE_NAME_LENGTH.min),
                    Validators.maxLength(TABLE_NAME_LENGTH.max),
                ]),
            ),
        });
    }

    submit(): void {
        this.builderForm.markAllAsTouched();

        if (this.builderForm.valid) {
            this.error = undefined;
            this.createTableEmitter.emit({ name: this.nameControl.value });
        } else {
            this.error = `Must be within ${TABLE_NAME_LENGTH.min} and ${TABLE_NAME_LENGTH.max} characters long.`;
        }
    }
}
