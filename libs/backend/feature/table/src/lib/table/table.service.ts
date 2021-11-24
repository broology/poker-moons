import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateTableRequest, CreateTableResponse, GetTableResponse, TableId } from '@poker-moons/shared/type';

@Injectable()
export class TableService {
    create(dto: CreateTableRequest): CreateTableResponse {
        throw new NotImplementedException();
    }

    get(id: TableId): GetTableResponse {
        throw new NotImplementedException();
    }
}
