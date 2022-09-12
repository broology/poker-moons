import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DialogCopy } from '@poker-moons/frontend/shared/ui';
import { WinnerMap } from '@poker-moons/shared/type';

@Component({
    selector: 'poker-moons-winner-display-ui',
    templateUrl: './winner-display-ui.component.html',
    styleUrls: ['./winner-display-ui.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WinnerDisplayUiComponent {
    @Input() winners!: WinnerMap;

    readonly dialogCopy: DialogCopy = {
        title: 'Winner(s)',
    };
}
