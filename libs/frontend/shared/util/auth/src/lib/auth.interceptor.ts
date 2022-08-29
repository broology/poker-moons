import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TableId } from '@poker-moons/shared/type';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * @description Interceptor responsible for setting the clients `Authorization` header based on the `route`.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private readonly authService: AuthService, private readonly router: Router) {}

    /**
     * @description Intercepts and http request made by the client, and determines if it should add a `Authorization` header.
     *
     * Will only add the token to the header if they are currently at a table, and have an existing `token` is in
     * `localStorage`.
     */
    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let headers = req.headers;

        const tableId = this.getTableIdFromPath();

        if (tableId) {
            const data = this.authService.get(tableId);

            if (data) {
                headers = headers.set('Authorization', `Bearer ${data.token}`);
            }
        }

        return next.handle(req.clone({ headers }));
    }

    /**
     * @description With the `router#url` extracts the `tableId` from the path.
     */
    private getTableIdFromPath(): TableId | null {
        const url = this.router.parseUrl(this.router.url);

        if (!url.root.hasChildren()) {
            return null;
        }

        const children = url.root.children;

        if (children['primary'].segments[0]?.path === 'table') {
            return (children['primary'].segments[1]?.path as TableId) || null;
        }

        return null;
    }
}
