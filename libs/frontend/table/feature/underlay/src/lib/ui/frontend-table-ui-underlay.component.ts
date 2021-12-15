import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ImmutablePublicPlayer, MutablePublicPlayer, PlayerId, Round, SeatId } from '@poker-moons/shared/type';
import { Observable } from 'rxjs';

@Component({
    selector: 'poker-moons-frontend-table-ui-underlay',
    templateUrl: './frontend-table-ui-underlay.component.html',
    styleUrls: ['./frontend-table-ui-underlay.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrontendTableUiUnderlayComponent {
    @Input() activeRound$!: Observable<Round>;

    @Input() immutablePlayerMap$!: Observable<Record<PlayerId, ImmutablePublicPlayer>>;

    @Input() mutablePlayerMap$!: Observable<Record<PlayerId, MutablePublicPlayer>>;

    @Input() seatMap$!: Observable<Record<SeatId, PlayerId | null>>;
}
