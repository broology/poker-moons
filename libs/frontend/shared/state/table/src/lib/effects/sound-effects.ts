import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { AudioPlayerService } from '@poker-moons/frontend/shared/util/audio';
import { concatMap, of, tap, withLatestFrom } from 'rxjs';
import { tableWsActionMap } from '../actions/ws.actions';
import { selectClientImmutablePlayer, selectClientSeatId } from '../table-state.selectors';

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
                    switch (payload.status) {
                        case 'ended':
                            return this.audioPlayerService.play('gameFinished');
                        case 'lobby':
                        case 'in-progress':
                    }
                }),
            ),
        { dispatch: false },
    );

    turn$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(tableWsActionMap.turn),
                concatMap((action) => of(action).pipe(withLatestFrom(this.store.pipe(select(selectClientSeatId))))),
                tap(([{ payload }, clientSeatId]) => {
                    switch (payload.newStatus) {
                        case 'called':
                        case 'raised':
                        case 'all-in':
                            this.audioPlayerService.play('stackMove');
                            break;
                        case 'checked':
                            this.audioPlayerService.play('check');
                            break;
                        case 'folded':
                            this.audioPlayerService.play('fold');
                            break;
                    }

                    // Notify client it's their turn after action sound is played
                    setTimeout(() => {
                        if (payload.newActiveSeatId === clientSeatId) {
                            this.audioPlayerService.play('clientTurn');
                        }
                    }, 500);
                }),
            ),
        { dispatch: false },
    );

    winner$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(tableWsActionMap.winner),
                concatMap((action) =>
                    of(action).pipe(withLatestFrom(this.store.pipe(select(selectClientImmutablePlayer)))),
                ),
                tap(([{ payload }, player]) => {
                    if (player) {
                        const isWinner = Object.keys(payload.winners).some((playerId) => playerId === player.id);

                        if (isWinner) {
                            return this.audioPlayerService.play('winRound');
                        } else {
                            return this.audioPlayerService.play('loseRound');
                        }
                    }
                }),
            ),
        { dispatch: false },
    );

    constructor(
        private readonly actions$: Actions,
        private readonly audioPlayerService: AudioPlayerService,
        private readonly store: Store,
    ) {}
}
