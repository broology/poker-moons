import { Component, Input } from '@angular/core';
import type { ImmutablePublicPlayer, MutablePublicPlayer, PlayerId, SeatId } from '@poker-moons/shared/type';
import { seats } from '@poker-moons/shared/type';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'poker-moons-seat-layout-ui',
    templateUrl: './seat-layout-ui.component.html',
    styleUrls: ['./seat-layout-ui.component.scss'],
})
export class SeatLayoutUiComponent {
    @Input() seatMap!: Record<SeatId, PlayerId | null>;

    @Input() immutablePlayerMap$!: Observable<Record<PlayerId, ImmutablePublicPlayer>>;

    @Input() mutablePlayerMap$!: Observable<Record<PlayerId, MutablePublicPlayer>>;

    seats = seats;

    selectPlayerAtSeatId<T>(seatId: SeatId, playerMap: Observable<Record<PlayerId, T>>): Observable<T | null> {
        const playerId = this.seatMap[seatId];

        if (playerId == null) {
            return of(null);
        }

        return playerMap.pipe(map((p) => p[playerId]));
    }
}
