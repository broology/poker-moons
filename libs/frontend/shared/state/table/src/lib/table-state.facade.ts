import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
    Card,
    ImmutablePublicPlayer,
    JoinTableRequest,
    MutablePublicPlayer,
    PerformPlayerActionRequest,
    PlayerId,
    Round,
    SeatId,
} from '@poker-moons/shared/type';
import { Observable } from 'rxjs';
import { joinTable, leaveTable, performTableAction } from './actions/api.actions';
import { selectClientImmutablePlayer, selectClientMutablePlayer } from './table-state.selectors';
import {
    selectActiveRound,
    selectCards,
    selectImmutablePlayerMap,
    selectMutablePlayerMap,
    selectSeatMap,
} from './table.state';

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
     * The map of the players immutable data
     */
    selectImmutablePlayerMap(): Observable<Record<PlayerId, ImmutablePublicPlayer>> {
        return this.store.pipe(select(selectImmutablePlayerMap));
    }

    /**
     * The map of the players mutable data
     */
    selectMutablePlayerMap(): Observable<Record<PlayerId, MutablePublicPlayer>> {
        return this.store.pipe(select(selectMutablePlayerMap));
    }

    /**
     * Retrieve the information of the active round.
     */
    selectRound(): Observable<Round> {
        return this.store.pipe(select(selectActiveRound));
    }

    /**
     * Selects the immutable player that is on this client
     */
    selectClientImmutablePlayer(): Observable<ImmutablePublicPlayer | null> {
        return this.store.pipe(select(selectClientImmutablePlayer));
    }

    /**
     * Selects the immutable player that is on this client
     */
    selectClientMutablePlayer(): Observable<MutablePublicPlayer | null> {
        return this.store.pipe(select(selectClientMutablePlayer));
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
        this.store.dispatch(performTableAction.request({ payload: dto }));
    }
}
