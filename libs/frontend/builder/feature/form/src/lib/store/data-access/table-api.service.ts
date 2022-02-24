import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NgEnvironment, NG_ENVIRONMENT } from '@poker-moons/frontend/shared/util/environment';
import { CreateTableRequest, CreateTableResponse } from '@poker-moons/shared/type';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TableApiService {
    constructor(@Inject(NG_ENVIRONMENT) private readonly env: NgEnvironment, private readonly httpClient: HttpClient) {}

    create(dto: CreateTableRequest): Observable<CreateTableResponse> {
        return this.httpClient.post<CreateTableResponse>(`${this.env.api}/table`, dto, {
            responseType: 'text' as never,
        });
    }
}
