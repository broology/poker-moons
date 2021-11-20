import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
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
import { joinTable, leaveTable, preformTableAction } from './actions/api.actions';
import { selectClientPlayer } from './table-state.selectors';
import { selectActiveRound, selectCards, selectPlayerMap, selectSeatMap } from './table.state';

@Injectable({ providedIn: 'root' })
export class TableStateFacade {
    constructor(private readonly store: Store) {}

    /* Selectors */

    /**
     * The list of seats to display on the table.
     * - if `null` then the seat is empty and can be joined
     * - if `PlayerId` then the seat contains a player
     */
    selectSeatList(): Observable<Record<SeatId, PlayerId | null>> {
        return this.store.pipe(select(selectSeatMap));
    }

    /**
     * The map get the player from the state, while maintaining memoization
     */
    selectPlayerMap(): Observable<Record<PlayerId, PublicPlayer>> {
        return this.store.pipe(select(selectPlayerMap));
    }

    /**
     * Retrieve the information of the active round.
     */
    selectRound(): Observable<Round> {
        return this.store.pipe(select(selectActiveRound));
    }

    /**
     * Selects the player that is on this client
     */
    selectClientPlayer(): Observable<PublicPlayer | null> {
        return this.store.pipe(select(selectClientPlayer));
    }

    /**
     * Selects the cards of the current client
     */
    selectClientPlayerCards(): Observable<[Card, Card] | []> {
        return this.store.pipe(select(selectCards));
    }

    /* Actions */

    /**
     * Request the current client to join the game
     */
    join(dto: JoinTableRequest): void {
        this.store.dispatch(joinTable.request({ payload: dto }));
    }

    /**
     * Request the current client to leave the game
     */
    leave(): void {
        this.store.dispatch(leaveTable.request({ payload: undefined }));
    }

    /**
     * Perform an action with the current client
     */
    performAction(dto: PerformPlayerActionRequest): void {
        this.store.dispatch(preformTableAction.request({ payload: dto }));
    }
}
