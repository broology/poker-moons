import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChipDenomination } from '../chip.type';

@Component({
    selector: 'poker-moons-chip-stack',
    templateUrl: './chip-stack.component.html',
    styleUrls: ['./chip-stack.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipStackComponent {
    @Input() count!: number;

    @Input() denomination!: ChipDenomination;
}
