import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import { TableApiService } from './data-access/table-api.service';

interface TableBuilderState {
    loading: boolean;
}

@Injectable()
export class TableBuilderStore extends ComponentStore<TableBuilderState> {
    readonly loading$: Observable<boolean> = this.select((state) => state.loading);

    private readonly setLoading = this.updater((state, loading: boolean) => ({ ...state, loading }));

    readonly createTable = this.effect((o: Observable<void>) =>
        o.pipe(
            tap(() => {
                this.setLoading(true);
            }),
            switchMap(() =>
                this.tableApiService.create().pipe(
                    tapResponse(
                        (tableId) => {
                            // Success
                            this.setLoading(false);
                            this.router.navigate(['table', tableId]);
                        },
                        (e) => {
                            // Failed
                            alert('Something went wrong creating the table.');
                            console.log(e);
                            this.setLoading(false);
                        },
                    ),
                ),
            ),
        ),
    );

    constructor(private readonly tableApiService: TableApiService, private readonly router: Router) {
        super({ loading: false });
    }
}
