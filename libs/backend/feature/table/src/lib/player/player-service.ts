import { Injectable, NotImplementedException } from '@nestjs/common';
import { JoinTableRequest, JoinTableResponse, LeaveTableResponse, GetPlayerCardsResponse, PlayerId } from '@poker-moons/shared/type';

@Injectable()
export class PlayerService {
    create(dto: JoinTableRequest): JoinTableResponse {
        throw new NotImplementedException();
    }
}
