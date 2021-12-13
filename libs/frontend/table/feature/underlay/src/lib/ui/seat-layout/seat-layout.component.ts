import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'poker-moons-seat-layout',
    templateUrl: './seat-layout.component.html',
    styleUrls: ['./seat-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatLayoutComponent {}