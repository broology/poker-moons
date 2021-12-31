import type { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { CreateTableRequest } from '@poker-moons/shared/type';
import type { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TableApiService } from './data-access/table-api.service';

interface BuilderState {
    loading: boolean;
}

@Injectable()
export class FrontendBuilderStore extends ComponentStore<BuilderState> {
    readonly loading$: Observable<boolean> = this.select((state) => state.loading);

    constructor(private tableApiService: TableApiService) {
        super({ loading: false });
    }

    private readonly setLoading = this.updater((state, loading: boolean) => ({ ...state, loading }));

    readonly createTable = this.effect((dto: Observable<CreateTableRequest>) =>
        dto.pipe(
            tap(() => {
                this.setLoading(true);
            }),
            switchMap((req) =>
                this.tableApiService.create(req).pipe(
                    tapResponse(
                        (table) => {
                            // Success
                            this.setLoading(false);
                            //TODO Forward to table page
                        },
                        (error: HttpErrorResponse) => {
                            // Failed
                            alert(JSON.stringify(error, null, '\t'));
                            this.setLoading(false);
                        },
                    ),
                ),
            ),
        ),
    );
}
