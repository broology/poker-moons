import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { nanoid } from 'nanoid';

@Component({
    selector: 'poker-moons-chips',
    templateUrl: './chips.component.html',
    styleUrls: ['./chips.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsComponent implements OnChanges {
    id = `chips_${nanoid()}`;

    @Input() amount!: number;

    ngOnChanges(): void {
        import('./wasm-render').then((module) => {
            console.log('change made');
            module.render(this.id, BigInt(this.amount));
        });
    }
}
