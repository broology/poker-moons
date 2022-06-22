import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { catchError, concatMap, Observable, of, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { getCards, joinTable, leaveTable, performTableAction, toggleReadyStatus } from '../actions/api.actions';
import { PlayerApiService } from '../shared/data-access/player-api.service';
import { AsyncRequestActions } from '../shared/util/action-util';
import { selectPlayerId, selectTableId } from '../table.state';

@Injectable()
export class TableStateApiEffects {
    requestJoinTable$ = createEffect(() =>
        this.actions$.pipe(
            ofType(joinTable.request),
            concatMap((action) => of(action).pipe(withLatestFrom(this.store.pipe(select(selectTableId))))),
            switchMap(([action, tableId]) => {
                if (tableId === null) {
                    throw new Error('Missing required params');
                }

                return this.performApiRequest(joinTable, () => this.playerApiService.join(tableId, action.payload));
            }),
        ),
    );

    requestLeaveTable$ = createEffect(() =>
        this.actions$.pipe(
            ofType(leaveTable.request),
            concatMap((action) =>
                of(action).pipe(
                    withLatestFrom(this.store.pipe(select(selectTableId)), this.store.pipe(select(selectPlayerId))),
                ),
            ),
            switchMap(([, tableId, playerId]) => {
                if (tableId === null || playerId === null) {
                    throw new Error('Missing required params');
                }

                return this.performApiRequest(leaveTable, () => this.playerApiService.leave(tableId, playerId));
            }),
        ),
    );

    requestToggleReadyStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(toggleReadyStatus.request),
            concatMap((action) =>
                of(action).pipe(
                    withLatestFrom(this.store.pipe(select(selectTableId)), this.store.pipe(select(selectPlayerId))),
                ),
            ),
            switchMap(([, tableId, playerId]) => {
                if (tableId === null || playerId === null) {
                    throw new Error('Missing required params');
                }

                return this.performApiRequest(toggleReadyStatus, () =>
                    this.playerApiService.toggleReadyStatus(tableId, playerId),
                );
            }),
        ),
    );

    requestPerformTableAction$ = createEffect(() =>
        this.actions$.pipe(
            ofType(performTableAction.request),
            concatMap((action) =>
                of(action).pipe(
                    withLatestFrom(this.store.pipe(select(selectTableId)), this.store.pipe(select(selectPlayerId))),
                ),
            ),
            switchMap(([action, tableId, playerId]) => {
                if (tableId === null || playerId === null) {
                    throw new Error('Missing required params');
                }

                return this.performApiRequest(performTableAction, () =>
                    this.playerApiService.performAction(tableId, playerId, action.payload),
                );
            }),
        ),
    );

    requestGetCards$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getCards.request),
            concatMap((action) =>
                of(action).pipe(
                    withLatestFrom(this.store.pipe(select(selectTableId)), this.store.pipe(select(selectPlayerId))),
                ),
            ),
            switchMap(([, tableId, playerId]) => {
                if (tableId === null || playerId === null) {
                    // Player not joined yet
                    return of();
                }

                return this.performApiRequest(getCards, () =>
                    this.playerApiService
                        .getCards(tableId, playerId)
                        .pipe(switchMap((cards) => of({ playerId, cards }))),
                );
            }),
        ),
    );

    /**
     * In the case of any api failures display the error message requested
     */
    failedApiRequest$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(...[getCards, joinTable, leaveTable, performTableAction].map((action) => action.failure)),
                tap(({ payload }) => {
                    alert(payload);
                }),
            ),
        { dispatch: false },
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly playerApiService: PlayerApiService,
    ) {}

    private performApiRequest<Request, SuccessResponse, FailureResponse>(
        action: AsyncRequestActions<Request, SuccessResponse, FailureResponse>,
        apiServiceMethod: () => Observable<SuccessResponse>,
    ) {
        return apiServiceMethod().pipe(
            take(1),
            switchMap((response) => of(action.success({ payload: response }))),
            catchError((err) => {
                console.error(err);
                return of(action.failure({ payload: `Error performing: ${action.request.type}` as any }));
            }),
        );
    }
}
