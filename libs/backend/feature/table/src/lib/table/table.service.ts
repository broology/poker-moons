import { Injectable } from '@nestjs/common';
import {
    CreateTableRequest,
    CreateTableResponse,
    GetTableResponse,
    ServerTableState,
    TableId,
} from '@poker-moons/shared/type';
import { TableStateManagerService } from '../table-state-manager/table-state-manager.service';
import { CustomLoggerService } from '@poker-moons/backend/utility';

@Injectable()
export class TableService {
    private logger = new CustomLoggerService(TableService.name);

    constructor(private readonly tableStateManagerService: TableStateManagerService) {}

    async create(dto: CreateTableRequest): Promise<CreateTableResponse> {
        this.logger.log('Creating new table');
        return await this.tableStateManagerService.createNewTable(dto.name);
    }

    async get(id: TableId): Promise<GetTableResponse> {
        const serverTableState: ServerTableState = await this.tableStateManagerService.getTableById(id);
        this.logger.log('Got table: ' + id);
        this.logger.debug('returning: ' + JSON.stringify({ id: id, name: serverTableState.name }, null, 4));
        return {
            id: id,
            name: serverTableState.name,
        };
    }

    async delete(id: TableId): Promise<TableId> {
        await this.tableStateManagerService.deleteTable(id);
        this.logger.log('Deleted table with id: ' + id);
        return id;
    }
}
