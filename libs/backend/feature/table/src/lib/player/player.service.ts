import { Injectable, NotImplementedException } from '@nestjs/common';
import {
    GetPlayerCardsResponse,
    JoinTableRequest,
    JoinTableResponse,
    LeaveTableResponse,
    PlayerId,
    TableId,
} from '@poker-moons/shared/type';

@Injectable()
export class PlayerService {
    create(dto: JoinTableRequest): JoinTableResponse {
        throw new NotImplementedException();
    }

    delete(tableId: TableId, playerId: PlayerId): LeaveTableResponse {
        throw new NotImplementedException();
    }

    getCards(tableId: TableId, playerId: PlayerId): GetPlayerCardsResponse {
        throw new NotImplementedException();
    }
}