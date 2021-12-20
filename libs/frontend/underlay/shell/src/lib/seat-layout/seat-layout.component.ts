import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { ImmutablePublicPlayer, MutablePublicPlayer, PlayerId, Round, SeatId } from '@poker-moons/shared/type';
import { seats } from '@poker-moons/shared/type';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'poker-moons-seat-layout',
    templateUrl: './seat-layout.component.html',
    styleUrls: ['./seat-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatLayoutComponent {
    @Input() activeRound$!: Observable<Round>;

    @Input() immutablePlayerMap$!: Observable<Record<PlayerId, ImmutablePublicPlayer>>;

    @Input() mutablePlayerMap$!: Observable<Record<PlayerId, MutablePublicPlayer>>;

    @Input() seatMap!: Record<SeatId, PlayerId | null>;

    _seats = seats;

    selectPlayerBySeatId<T>(
        seatId: SeatId,
        playerMap: Observable<Record<PlayerId, T>> | Observable<Record<PlayerId, T>>,
    ): Observable<T | null> {
        const playerId = this.seatMap[seatId];

        if (playerId) {
            return playerMap.pipe(map((value) => value[playerId]));
        }

        return of(null);
    }
}
