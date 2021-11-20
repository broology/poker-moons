import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TableEvent } from '@poker-moons/shared/type';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TableSocketService } from '../shared/data-access/table-socket.service';
import { connectToWs, initialize, tableWsActionMap } from '../table-state.actions';

@Injectable()
export class TableStateWsEffects {
    /**
     * Fetches an loads the question into the state. Then triggers the action to connect to the websocket
     */
    loadTable$ = createEffect(() =>
        this.actions$.pipe(
            ofType(initialize),
            switchMap(({ tableId }) => of(connectToWs.request({ payload: { tableId } }))),
        ),
    );

    /**
     * When the websocket is requested to be loaded.
     * - Initializes the socket connection
     * - Sets up each table event websocket observable
     * - Connects to the websocket
     */
    requestConnectionToWs$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(connectToWs.request),
                tap(({ payload: { tableId } }) => {
                    this.tableSocketService.initialize(tableId);

                    this.tableSocketService
                        .onEvent('connected')
                        .pipe(tap((data) => this.store.dispatch(connectToWs.success({ payload: data }))))
                        .subscribe();

                    for (const [type, action] of Object.entries(tableWsActionMap)) {
                        this.tableSocketService
                            .onEvent(<TableEvent['type']>type)
                            .pipe(tap((data) => this.store.dispatch(action({ payload: <never>data }))))
                            .subscribe();
                    }

                    this.tableSocketService.connect();
                }),
            ),
        { dispatch: false },
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly tableSocketService: TableSocketService,
    ) {}
}
