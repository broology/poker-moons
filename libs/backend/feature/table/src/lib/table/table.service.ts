import { Injectable, NotImplementedException } from '@nestjs/common';
import {
    CreateTableRequest,
    CreateTableResponse,
    GetTableResponse,
    TableId,
    UpdateTableRequest,
    UpdateTableResponse,
} from '@poker-moons/shared/type';

@Injectable()
export class TableService {
    create(dto: CreateTableRequest): CreateTableResponse {
        throw new NotImplementedException();
    }

    get(id: TableId): GetTableResponse {
        throw new NotImplementedException();
    }

    update(dto: UpdateTableRequest): UpdateTableResponse {
        throw new NotImplementedException();
    }
}
