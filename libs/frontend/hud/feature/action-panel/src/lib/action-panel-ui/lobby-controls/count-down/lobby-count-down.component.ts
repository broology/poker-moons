import { Component, Input } from '@angular/core';

@Component({
    selector: 'poker-moons-lobby-count-down',
    templateUrl: './lobby-count-down.component.html',
    styleUrls: ['./lobby-count-down.component.scss'],
})
export class LobbyCountDownComponent {
    @Input() startDate!: Date;
}
