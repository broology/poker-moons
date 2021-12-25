import { Component } from '@angular/core';
import { seats } from '@poker-moons/shared/type';

@Component({
    selector: 'poker-moons-seat-layout-ui',
    templateUrl: './seat-layout-ui.component.html',
    styleUrls: ['./seat-layout-ui.component.scss'],
})
export class SeatLayoutUiComponent {
    seats = seats;
}
