import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { concatMap, of, tap, withLatestFrom } from 'rxjs';
import { tableWsActionMap } from '../actions/ws.actions';
import { selectStartDate, selectStatus } from '../table.state';

@Injectable()
export class TableStatePopupEffects {
    updatedTableStatus$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(tableWsActionMap.tableStatusChanged),
                concatMap((action) =>
                    of(action).pipe(
                        withLatestFrom(this.store.pipe(select(selectStatus)), this.store.pipe(select(selectStartDate))),
                    ),
                ),
                tap(([, status, startDate]) => {
                    switch (status) {
                        case 'lobby':
                            if (startDate === null) {
                                alert(`Game queue stopped`);
                            } else {
                                alert(`Game queue started, game will start at ${startDate}`);
                            }
                            break;
                        case 'in-progress':
                            alert(`Game has started!`);
                            break;
                        case 'ended':
                            alert('Game has ended!');
                    }
                }),
            ),
        { dispatch: false },
    );

    constructor(private readonly actions$: Actions, private readonly store: Store) {}
}
