import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { TableStateFacade } from '@poker-moons/frontend/shared/state/table';
import { TableId } from '@poker-moons/shared/type';
import { catchError, map, Observable, of } from 'rxjs';
import { TableNgApiService } from './data-access/table-ng-api.service';

@Injectable({
    providedIn: 'root',
})
export class TableRoutingGuard implements CanActivate {
    constructor(
        private readonly tableNgApiService: TableNgApiService,
        private readonly tableStateFacade: TableStateFacade,
        private readonly router: Router,
    ) {}

    /**
     * When `/table/:tableId` is loaded, this will attempt to check to see if the table exists.
     *
     * Success:
     * - initializes the table state's websocket connection
     *
     * Failure:
     * - Throws error alert and redirects to builder
     */
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | UrlTree {
        const tableId: TableId | undefined = route.params.tableId;

        if (tableId == null) {
            return this.router.createUrlTree(['']);
        }

        return this.tableNgApiService.get(tableId).pipe(
            map(() => {
                this.tableStateFacade.initialize(tableId);
                return true;
            }),
            catchError(() => {
                alert('Table not found');
                return of(this.router.createUrlTree(['builder']));
            }),
        );
    }
}
