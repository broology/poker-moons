import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'poker-moons-seat',
    templateUrl: './seat.component.html',
    styleUrls: ['./seat.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatComponent {}