import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JoinTableRequest, TableStatus } from '@poker-moons/shared/type';

@Component({
    selector: 'poker-moons-spectator-controls',
    templateUrl: './spectator-controls.component.html',
    styleUrls: ['./spectator-controls.component.scss'],
})
export class SpectatorControlsComponent implements OnInit {
    USERNAME_LENGTH = { min: 2, max: 15 };

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
                    Validators.minLength(this.USERNAME_LENGTH.min),
                    Validators.maxLength(this.USERNAME_LENGTH.max),
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
