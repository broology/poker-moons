import { Injectable, NotImplementedException } from '@nestjs/common';
import { JoinTableRequest, JoinTableResponse, LeaveTableResponse, GetPlayerCardsResponse, PlayerId, TableId } from '@poker-moons/shared/type';

@Injectable()
export class PlayerService {
    create(dto: JoinTableRequest): JoinTableResponse {
        throw new NotImplementedException();
    }
  
    delete(player_id: PlayerId, table_id: TableId): LeaveTableResponse {
        throw new NotImplementedException();
    }
  
    getCards(player_id: PlayerId, table_id: TableId): GetPlayerCardsResponse {
        throw new NotImplementedException();
    }
}
