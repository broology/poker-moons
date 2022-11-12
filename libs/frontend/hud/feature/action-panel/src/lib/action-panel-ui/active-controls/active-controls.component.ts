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
import { Player, PlayerAction, Round } from '@poker-moons/shared/type';
import { map, Observable, startWith } from 'rxjs';

@Component({
    selector: 'poker-moons-active-controls',
    templateUrl: './active-controls.component.html',
    styleUrls: ['./active-controls.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveControlsComponent implements OnInit, OnChanges {
    /**
     * @description The client player data.
     */
    @Input() player!: Pick<Player, 'biddingCycleCalled' | 'stack'>;

    /**
     * @description The information about the active round.
     */
    @Input() round!: Pick<Round, 'toCall' | 'smallBlind' | 'previousRaise'>;

    /**
     * @description The user has clicked an action and it is currently loading.
     */
    @Input() actionLoading!: boolean;

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
        return this.round.toCall + this.round.previousRaise;
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
        const round: Pick<Round, 'toCall' | 'smallBlind'> | null = changes['round']?.currentValue;

        if (
            round &&
            !isNaN(round.toCall) &&
            round.toCall !== (changes['round']?.previousValue as Pick<Round, 'toCall' | 'smallBlind'> | null)?.toCall
        ) {
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
            if (this.amountControl.value === this.player.stack) {
                return this.allIn();
            }

            this.playerActionEmitter.emit({ type: 'raise', amount: this.amountControl.value });
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
                Validators.compose([Validators.min(this.minRaiseAmount), Validators.max(this.player.stack)]),
            ),
        });

        this.currentRaiseAmount$ = this.amountControl.valueChanges.pipe(
            startWith(this.minRaiseAmount),
            map((v) => v),
        );
    }
}
