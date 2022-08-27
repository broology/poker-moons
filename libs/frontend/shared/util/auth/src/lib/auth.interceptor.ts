import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableStateFacade } from '@poker-moons/frontend/shared/state/table';
import { first, Observable, switchMap } from 'rxjs';

/**
 * @description Interceptor responsible for setting the clients `Authorization` token for specified tables.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private readonly tableStateFacade: TableStateFacade) {}

    /**
     * @description Intercepts and http request made by the client, and determines if it should add a `Authorization` header.
     *
     * Will only add the token to the header if they are currently at a table, and have an existing `token` in
     * `localStorage`.
     */
    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return this.tableStateFacade.selectTableId().pipe(
            first(),
            switchMap((tableId) => {
                let headers = req.headers;

                if (tableId) {
                    const token = this.getToken(tableId);

                    if (token) {
                        headers = headers.set('Authorization', `Bearer ${token}`);
                    }
                }

                return next.handle(req.clone({ headers }));
            }),
        );
    }

    /**
     * @description Fetches the `token` from local storage for the given {@link tableId} if it exists.
     *
     * @param tableId
     */
    private getToken(tableId: string): string | null {
        const value = localStorage.getItem(tableId);

        if (!value) {
            return null;
        }

        const { token } = JSON.parse(value);

        return token;
    }
}
