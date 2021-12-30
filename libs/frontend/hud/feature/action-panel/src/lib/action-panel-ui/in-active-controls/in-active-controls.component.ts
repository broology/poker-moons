import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'poker-moons-in-active-controls',
    templateUrl: './in-active-controls.component.html',
    styleUrls: ['./in-active-controls.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InActiveControlsComponent {}
