import { Injectable, NotImplementedException } from '@nestjs/common';
import { PerformPlayerActionRequest, PerformPlayerActionResponse } from '@poker-moons/shared/type';

@Injectable()
export class PlayerActionService {
    perform(dto: PerformPlayerActionRequest): PerformPlayerActionResponse {
        throw new NotImplementedException();
    }
}
