import { Injectable } from '@nestjs/common';
import { CreateTableRequest, CreateTableResponse } from '@poker-moons/shared/type';

@Injectable()
export class TableService {
  create(dto: CreateTableRequest): CreateTableResponse {
    return {
      id: 'table_id',
      players: [],
      ...dto
    };
  }
}
