import { Injectable } from '@nestjs/common';
import {
    CreateTableRequest,
    CreateTableResponse,
    GetTableResponse,
    ServerTableState,
    TableId,
} from '@poker-moons/shared/type';
import { TableStateManagerService } from '../table-state-manager/table-state-manager.service';

@Injectable()
export class TableService {
    constructor(private readonly tableStateManagerService: TableStateManagerService) {}

    async create(dto: CreateTableRequest): Promise<CreateTableResponse> {
        return await this.tableStateManagerService.createNewTable(dto.name);
    }

    async get(id: TableId): Promise<GetTableResponse> {
        const serverTableState: ServerTableState = await this.tableStateManagerService.getTableById(id);
        return {
            id: id,
            name: serverTableState.name,
        };
    }
}
