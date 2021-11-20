import { Injectable } from '@angular/core';
import {
    Card,
    JoinTableRequest,
    PerformPlayerActionRequest,
    PlayerId,
    PublicPlayer,
    Round,
    SeatId,
} from '@poker-moons/shared/type';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TableStateFacade {
    /* Selectors */

    selectSeatList(): Observable<[SeatId, PlayerId][]> {
        throw new Error('Not Implemented');
    }

    selectPlayerMap(): Observable<Record<PlayerId, PublicPlayer>> {
        throw new Error('Not Implemented');
    }

    selectRound(): Observable<Round> {
        throw new Error('Not Implemented');
    }

    selectPlayerCards(): Observable<[Card, Card] | []> {
        throw new Error('Not Implemented');
    }

    /* Actions */
    join(dto: JoinTableRequest): void {
        throw new Error('Not Implemented');
    }

    leave(): void {
        throw new Error('Not Implemented');
    }

    performAction(dto: PerformPlayerActionRequest): void {
        throw new Error('Not Implemented');
    }
}
