import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NG_ENVIRONMENT, NgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { GetTableResponse, TableId } from '@poker-moons/shared/type';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TableNgApiService {
    constructor(@Inject(NG_ENVIRONMENT) private readonly env: NgEnvironment, private readonly httpClient: HttpClient) {}

    get(tableId: TableId): Observable<GetTableResponse> {
        return this.httpClient.get<GetTableResponse>(`${this.env.api}/table/${tableId}`);
    }
}
