import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogCopy } from '@poker-moons/frontend/shared/ui';
import { JoinTableRequest, TableStatus } from '@poker-moons/shared/type';

const USERNAME_LENGTH = { min: 2, max: 15 };

@Component({
    selector: 'poker-moons-spectator-controls',
    templateUrl: './spectator-controls.component.html',
    styleUrls: ['./spectator-controls.component.scss'],
})
export class SpectatorControlsComponent implements OnInit {
    readonly dialogCopy: DialogCopy = {
        title: 'Enter a username to join the game',
        primaryButton: 'JOIN',
    };

    @Input() tableStatus!: TableStatus;

    @Output() joinTableEmitter: EventEmitter<JoinTableRequest>;

    error?: string;

    spectatorForm!: FormGroup;

    get usernameControl(): FormControl<string> {
        return this.spectatorForm.get('username') as FormControl<string>;
    }

    constructor() {
        this.joinTableEmitter = new EventEmitter();
    }

    ngOnInit(): void {
        this.spectatorForm = new FormGroup({
            username: new FormControl(
                '',
                Validators.compose([
                    Validators.minLength(USERNAME_LENGTH.min),
                    Validators.maxLength(USERNAME_LENGTH.max),
                ]),
            ),
        });
    }

    join(): void {
        this.spectatorForm.markAllAsTouched();

        if (this.spectatorForm.valid) {
            this.error = undefined;
            this.joinTableEmitter.emit({ username: this.usernameControl.value });
        } else {
            this.error = `Must be within length ${USERNAME_LENGTH.min} - ${USERNAME_LENGTH.max} characters`;
        }
    }
}
