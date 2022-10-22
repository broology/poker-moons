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
    WinnerMap,
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
    selectSumRoundCalled,
} from './table-state.selectors';
import {
    ApiLoaderStates,
    selectActiveRound,
    selectLoaders,
    selectSeatMap,
    selectStartDate,
    selectStatus,
    selectTableId,
    selectWinners,
} from './table.state';

@Injectable({ providedIn: 'root' })
export class TableStateFacade {
    constructor(private readonly store: Store) {}

    /* Selectors */

    /**
     * @description Selects the ID of the table the client is connected too. `null` if not connected to any.
     */
    selectTableId(): Observable<TableId | null> {
        return this.store.pipe(select(selectTableId));
    }

    /**
     * @description The map of seats to display on the table.
     *
     * - If `null` then the seat is empty and can be joined.
     * - If `PlayerId` then the seat contains a player.
     */
    selectSeatMap(): Observable<Partial<Record<SeatId, PlayerId>>> {
        return this.store.pipe(select(selectSeatMap));
    }

    /**
     * @description The status of the table.
     */
    selectStatus(): Observable<TableStatus> {
        return this.store.pipe(select(selectStatus));
    }

    /**
     * @description The start date of the table.
     *
     * - `null`: in the case where still in lobby and not all players are ready.
     */
    selectStartDate(): Observable<Date | null> {
        return this.store.pipe(select(selectStartDate));
    }

    /**
     * @description The immutable player data with is sitting at the seat.
     */
    selectImmutablePlayerBySeatId(seatId: SeatId): Observable<ImmutablePublicPlayer | null> {
        return this.store.pipe(select(selectImmutablePlayerBySeatId({ seatId })));
    }

    /**
     * @description The mutable player data which is sitting at the seat.
     */
    selectMutablePlayerBySeatId(seatId: SeatId): Observable<MutablePublicPlayer | null> {
        return this.store.pipe(select(selectMutablePlayerBySeatId({ seatId })));
    }

    /**
     * @description The active seat at the table.
     */
    selectActiveSeatId(): Observable<SeatId | null> {
        return this.store.pipe(select(selectActiveSeatId));
    }

    /**
     * @description Selects the total amount of chips that have been round called. (aka, number of chips to display
     * in the center)
     *
     * Not the same as pot, as bidding cycle chips contribute to the pot total.
     */
    selectSumRoundCalled(): Observable<number> {
        return this.store.pipe(select(selectSumRoundCalled));
    }

    /**
     * @description Retrieve the information of the active round.
     */
    selectRound(): Observable<Round> {
        return this.store.pipe(select(selectActiveRound));
    }

    /**
     * @description Selects the immutable player that is on this client.
     */
    selectClientImmutablePlayer(): Observable<ImmutablePublicPlayer | null> {
        return this.store.pipe(select(selectClientImmutablePlayer));
    }

    /**
     * @description Selects the immutable player that is on this client.
     */
    selectClientMutablePlayer(): Observable<MutablePublicPlayer | null> {
        return this.store.pipe(select(selectClientMutablePlayer));
    }

    /**
     * @description Selects the seat the client is sitting in. Otherwise returns undefined.
     */
    selectClientSeatId(): Observable<SeatId | null | undefined> {
        return this.store.pipe(select(selectClientSeatId));
    }

    /**
     * @description Retrieve the winners of the round that just ended.
     */
    selectWinners(): Observable<WinnerMap> {
        return this.store.pipe(select(selectWinners));
    }

    /**
     * @description Selects the api loading states.
     */
    selectLoaders(): Observable<ApiLoaderStates> {
        return this.store.pipe(select(selectLoaders));
    }

    /* Actions */

    /**
     * @description Makes a request to the client to load the table state of the given `tableId`.
     *
     * - To be used on route into the `/table/:tableId`
     */
    initialize(tableId: TableId): void {
        this.store.dispatch(connectToWs.request({ payload: { tableId } }));
    }

    /**
     * @description Request the current client to join the game.
     */
    join(dto: JoinTableRequest): void {
        this.store.dispatch(joinTable.request({ payload: dto }));
    }

    /**
     * @description Request the current client to leave the game.
     */
    leave(): void {
        this.store.dispatch(leaveTable.request({ payload: undefined }));
    }

    /**
     * @description Request the current client to toggle their ready status.
     */
    toggleReadyStatus(): void {
        this.store.dispatch(toggleReadyStatus.request({ payload: undefined }));
    }

    /**
     * @description Perform an action with the current client.
     */
    performAction(dto: PerformPlayerActionRequest): void {
        this.store.dispatch(performTableAction.request({ payload: dto }));
    }
}
