import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AudioPlayerService } from '@poker-moons/frontend/shared/util/audio';
import { tap } from 'rxjs';
import { tableWsActionMap } from '../actions/ws.actions';

@Injectable()
export class TableStateSoundEffects {
    roundChanged$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(tableWsActionMap.roundChanged),
                tap(({ payload }) => {
                    switch (payload.roundStatus) {
                        case 'deal':
                            return this.audioPlayerService.play('shuffle');
                        case 'flop':
                            return this.audioPlayerService.play('flop');
                        case 'turn':
                            return this.audioPlayerService.play('cardFlip');
                        case 'river':
                            return this.audioPlayerService.play('cardFlip');
                    }
                }),
            ),
        { dispatch: false },
    );

    tableStatusChanged$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(tableWsActionMap.tableStatusChanged),
                tap(({ payload }) => {
                    if (payload.status === 'in-progress') {
                        this.audioPlayerService.play('shuffle');
                    }
                }),
            ),
        { dispatch: false },
    );

    turn$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(tableWsActionMap.turn),
                tap(({ payload }) => {
                    switch (payload.newStatus) {
                        case 'called':
                        case 'raised':
                        case 'all-in':
                            return this.audioPlayerService.play('stackMove');
                        case 'folded':
                            return this.audioPlayerService.play('cardSlide');
                    }
                }),
            ),
        { dispatch: false },
    );

    constructor(private readonly actions$: Actions, private readonly audioPlayerService: AudioPlayerService) {}
}
