import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlayerAction } from '@poker-moons/shared/type';

@Component({
    selector: 'poker-moons-active-controls',
    templateUrl: './active-controls.component.html',
    styleUrls: ['./active-controls.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveControlsComponent implements OnInit {
    /**
     * The `called` amount of the player this round
     *
     * - Used to detect if we are calling or checking as a base
     */
    @Input() called!: number;

    /**
     * The `stack` available for the user
     */
    @Input() stack!: number;

    /**
     * The `call` amount set by the table
     */
    @Input() toCall!: number;

    /**
     * Action emission event that is sent to table state
     */
    @Output() readonly playerActionEmitter = new EventEmitter<PlayerAction>();

    raiseFormGroup!: FormGroup;

    get amountControl(): FormControl {
        return this.raiseFormGroup.get('amount') as FormControl;
    }

    ngOnInit(): void {
        this.raiseFormGroup = new FormGroup({
            amount: new FormControl(
                this.toCall,
                Validators.compose([Validators.min(this.toCall), Validators.max(this.stack)]),
            ),
        });
    }

    fold(): void {
        this.playerActionEmitter.emit({ type: 'fold' });
    }

    check(): void {
        this.playerActionEmitter.emit({ type: 'check' });
    }

    call(): void {
        this.playerActionEmitter.emit({ type: 'call' });
    }

    raise(): void {
        if (this.raiseFormGroup.valid) {
            this.playerActionEmitter.emit({ type: 'raise', amount: this.amountControl.value });
        }
    }

    /**
     * @note We might want to make this it's own `PlayerAction` as it's going to require different validation on `frontend` and `backend`
     */
    allIn(): void {
        this.playerActionEmitter.emit({ type: 'raise', amount: this.stack });
    }
}
