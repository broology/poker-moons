import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlayerAction } from '@poker-moons/shared/type';
import { map, Observable, startWith } from 'rxjs';

@Component({
    selector: 'poker-moons-active-controls',
    templateUrl: './active-controls.component.html',
    styleUrls: ['./active-controls.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveControlsComponent implements OnInit, OnChanges {
    /**
     * @description The `called` amount of the player this round.
     *
     * - Used to detect if we are calling or checking as a base.
     */
    @Input() called!: number;

    /**
     * @description The `stack` available for the user.
     */
    @Input() stack!: number;

    /**
     * @description The `call` amount set by the table.
     */
    @Input() toCall!: number;

    /**
     * @description Action emission event that is sent to table state.
     */
    @Output() readonly playerActionEmitter = new EventEmitter<PlayerAction>();

    raiseFormGroup!: FormGroup;

    currentRaiseAmount$!: Observable<number>;

    get amountControl(): FormControl<number> {
        return this.raiseFormGroup.get('amount') as FormControl<number>;
    }

    /**
     * @description The minimum raisable amount the player can perform.
     */
    get minRaiseAmount(): number {
        return Math.min(this.toCall * 2, this.stack);
    }

    ngOnInit(): void {
        this.initForm();
    }

    /**
     * @description Must re-initialize the form in the case of the toCall updating. As we have multiple backend
     * events updating this. Ideally there would only be one that would occur when the active seat changes, then we
     * wouldn't need to do this.
     */
    ngOnChanges(changes: SimpleChanges): void {
        const toCall = changes['toCall']?.currentValue;

        if (isNaN(toCall) && toCall !== changes['toCall']?.previousValue) {
            this.initForm();
        }
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
            if (this.raiseFormGroup.value === this.stack) {
                return this.allIn();
            }

            // NOTE: Considering how the backend works, we want them to raise the actual amount they committed too, not the raise amount + the to call. Which is what the backend does.
            this.playerActionEmitter.emit({ type: 'raise', amount: this.amountControl.value - this.toCall });
        }
    }

    allIn(): void {
        this.playerActionEmitter.emit({ type: 'all-in' });
    }

    /**
     * @description Initializes the form with the current min raise amount.
     */
    private initForm() {
        this.raiseFormGroup = new FormGroup({
            amount: new FormControl(
                this.minRaiseAmount,
                Validators.compose([Validators.min(this.minRaiseAmount), Validators.max(this.stack)]),
            ),
        });

        this.currentRaiseAmount$ = this.amountControl.valueChanges.pipe(
            startWith(this.minRaiseAmount ?? 1),
            map((v) => v),
        );
    }
}
