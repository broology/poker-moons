import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TableEvent } from '@poker-moons/shared/type';
import { tap } from 'rxjs/operators';
import { connectToWs, tableWsActionMap } from '../actions/ws.actions';
import { TableSocketService } from '../shared/data-access/table-socket.service';

@Injectable()
export class TableStateWsEffects {
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
                    try {
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
                    } catch (e) {
                        console.error(e);
                        this.store.dispatch(connectToWs.failure({ payload: 'Failed to connect to table.' }));
                    }
                }),
            ),
        { dispatch: false },
    );

    failedWsConnection$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(connectToWs.failure),
                tap(({ payload }) => {
                    alert(payload);
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
