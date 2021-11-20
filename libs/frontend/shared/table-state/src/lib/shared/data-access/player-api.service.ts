import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NgEnvironment, NG_ENVIRONMENT } from '@poker-moons/frontend/shared/environment';
import {
    JoinTableRequest,
    JoinTableResponse,
    LeaveTableResponse,
    PerformPlayerActionRequest,
    PerformPlayerActionResponse,
    PlayerId,
    TableId,
} from '@poker-moons/shared/type';
import { Observable } from 'rxjs';

/**
 * Frontend api service responsible for funneling requests from frontend to api.
 *
 * TODO Currently doesn't do any sort of authentication for the user need to add jwt or something at least.
 */
@Injectable({ providedIn: 'root' })
export class PlayerApiService {
    constructor(@Inject(NG_ENVIRONMENT) private readonly env: NgEnvironment, private readonly httpClient: HttpClient) {}

    join(tableId: TableId, dto: JoinTableRequest): Observable<JoinTableResponse> {
        return this.httpClient.post<JoinTableResponse>(`${this.env.api}/table/${tableId}/player`, dto);
    }

    leave(tableId: TableId, playerId: PlayerId): Observable<LeaveTableResponse> {
        return this.httpClient.put<LeaveTableResponse>(`${this.env.api}/table/${tableId}/player/${playerId}`, {});
    }

    performAction(
        tableId: TableId,
        playerId: PlayerId,
        dto: PerformPlayerActionRequest,
    ): Observable<PerformPlayerActionResponse> {
        return this.httpClient.put<PerformPlayerActionResponse>(
            `${this.env.api}/table/${tableId}/player/${playerId}/action`,
            dto,
        );
    }
}
