import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MutablePublicPlayer, Round } from '@poker-moons/shared/type';

@Component({
    selector: 'poker-moons-seat-action',
    templateUrl: './seat-action.component.html',
    styleUrls: ['./seat-action.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatActionComponent {}
