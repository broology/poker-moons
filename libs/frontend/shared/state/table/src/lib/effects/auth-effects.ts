import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { concatMap, of, tap, withLatestFrom } from 'rxjs';
import { joinTable } from '../actions/api.actions';
import { setPlayerId } from '../actions/auth.actions';
import { connectToWs } from '../actions/ws.actions';
import { selectTableId } from '../table.state';

@Injectable()
export class TableStateAuthEffects {
    /**
     * @description When the state is initialize, checks if the client already has a player in `localStorage`
     */
    setExistingPlayerIfExists$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(connectToWs.request),
                tap(({ payload: { tableId } }) => {
                    const value = localStorage.getItem(tableId);

                    if (value) {
                        const { playerId } = JSON.parse(value);

                        this.store.dispatch(setPlayerId({ payload: { playerId } }));
                    }
                }),
            ),
        { dispatch: false },
    );

    /**
     * @description After successfully joining a table set the `Player#id` and `Player#token` in local storage.
     */
    saveAuthDataOnJoinSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(joinTable.success),
                concatMap((action) => of(action).pipe(withLatestFrom(this.store.pipe(select(selectTableId))))),
                tap(([action, tableId]) => {
                    if (tableId === null) {
                        throw new Error('Missing required params');
                    }

                    localStorage.setItem(
                        tableId,
                        JSON.stringify({
                            created: new Date(),
                            token: action.payload.token,
                            playerId: action.payload.id,
                        }),
                    );
                }),
            ),
        { dispatch: false },
    );

    constructor(private readonly actions$: Actions, private readonly store: Store) {}
}
