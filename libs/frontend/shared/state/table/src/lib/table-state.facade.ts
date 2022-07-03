import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
    ImmutablePublicPlayer,
    JoinTableRequest,
    MutablePublicPlayer,
    PerformPlayerActionRequest,
    PlayerId,
    Round,
    SeatId,
    TableId,
    TableStatus,
} from '@poker-moons/shared/type';
import { Observable } from 'rxjs';
import { joinTable, leaveTable, performTableAction, toggleReadyStatus } from './actions/api.actions';
import { connectToWs } from './actions/ws.actions';
import {
    selectActiveSeatId,
    selectClientImmutablePlayer,
    selectClientMutablePlayer,
    selectClientSeatId,
    selectImmutablePlayerBySeatId,
    selectMutablePlayerBySeatId,
} from './table-state.selectors';
import { selectActiveRound, selectSeatMap, selectStartDate, selectStatus } from './table.state';

@Injectable({ providedIn: 'root' })
export class TableStateFacade {
    constructor(private readonly store: Store) {}

    /* Selectors */

    /**
     * The map of seats to display on the table.
     * - if `null` then the seat is empty and can be joined
     * - if `PlayerId` then the seat contains a player
     */
    selectSeatMap(): Observable<Partial<Record<SeatId, PlayerId>>> {
        return this.store.pipe(select(selectSeatMap));
    }

    /**
     * The status of the table
     */
    selectStatus(): Observable<TableStatus> {
        return this.store.pipe(select(selectStatus));
    }

    /**
     * The start date of the table.
     * - `null`: in the case where still in lobby and not all players are ready
     */
    selectStartDate(): Observable<Date | null> {
        return this.store.pipe(select(selectStartDate));
    }

    /**
     * The immutable player data with is sitting at the seat
     */
    selectImmutablePlayerBySeatId(seatId: SeatId): Observable<ImmutablePublicPlayer | null> {
        return this.store.pipe(select(selectImmutablePlayerBySeatId({ seatId })));
    }

    /**
     * The mutable player data which is sitting at the seat
     */
    selectMutablePlayerBySeatId(seatId: SeatId): Observable<MutablePublicPlayer | null> {
        return this.store.pipe(select(selectMutablePlayerBySeatId({ seatId })));
    }

    /**
     * The active seat at the table.
     */
    selectActiveSeatId(): Observable<SeatId | null> {
        return this.store.pipe(select(selectActiveSeatId));
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
     * Selects the seat the client is sitting in. Otherwise returns undefined
     */
    selectClientSeatId(): Observable<SeatId | null | undefined> {
        return this.store.pipe(select(selectClientSeatId));
    }

    /* Actions */

    /**
     * Makes a request to the client to load the table state of the given `tableId`.
     *
     * - To be used on route into the `/table/:tableId`
     */
    initialize(tableId: TableId): void {
        this.store.dispatch(connectToWs.request({ payload: { tableId } }));
    }

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
     * Request the current client to toggle their ready status
     */
    toggleReadyStatus(): void {
        this.store.dispatch(toggleReadyStatus.request({ payload: undefined }));
    }

    /**
     * Perform an action with the current client
     */
    performAction(dto: PerformPlayerActionRequest): void {
        this.store.dispatch(performTableAction.request({ payload: dto }));
    }
}
