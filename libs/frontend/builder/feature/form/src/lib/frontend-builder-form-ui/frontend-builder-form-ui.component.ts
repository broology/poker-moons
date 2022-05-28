import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogCopy } from '@poker-moons/frontend/shared/ui';
import { CreateTableRequest } from '@poker-moons/shared/type';

@Component({
    selector: 'poker-moons-frontend-builder-form-ui',
    templateUrl: './frontend-builder-form-ui.component.html',
    styleUrls: ['./frontend-builder-form-ui.component.scss'],
})
export class FrontendBuilderFormUiComponent implements OnInit {
    tableNameLength = { min: 3, max: 25 };

    dialogCopy: DialogCopy = {
        title: 'Create Table',
        primaryButton: 'CREATE',
    };

    @Input() loading!: boolean;

    @Output() createTableEmitter = new EventEmitter<CreateTableRequest>();

    builderForm!: FormGroup;

    get nameControl(): FormControl {
        return this.builderForm.get('name') as FormControl;
    }

    ngOnInit(): void {
        this.builderForm = new FormGroup({
            name: new FormControl(
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(this.tableNameLength.min),
                    Validators.maxLength(this.tableNameLength.max),
                ]),
            ),
        });
    }

    submit(): void {
        console.log('submitted');
        if (this.builderForm.valid) {
            this.createTableEmitter.emit({ name: this.nameControl.value });
        } else {
            this.builderForm.markAllAsTouched();
        }
    }
}
