import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogCopy } from '@poker-moons/frontend/shared/ui';
import { JoinTableRequest, TableStatus } from '@poker-moons/shared/type';

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

    readonly userNameLength = { min: 2, max: 15 };

    @Input() tableStatus!: TableStatus;

    @Output() joinTableEmitter: EventEmitter<JoinTableRequest>;

    spectatorForm!: FormGroup;

    get usernameControl(): FormControl {
        return this.spectatorForm.get('username') as FormControl;
    }

    constructor() {
        this.joinTableEmitter = new EventEmitter();
    }

    ngOnInit(): void {
        this.spectatorForm = new FormGroup({
            username: new FormControl(
                '',
                Validators.compose([
                    Validators.minLength(this.userNameLength.min),
                    Validators.maxLength(this.userNameLength.max),
                ]),
            ),
        });
    }

    join(): void {
        if (this.spectatorForm.valid) {
            this.joinTableEmitter.emit({ username: this.usernameControl.value });
        }
    }
}
