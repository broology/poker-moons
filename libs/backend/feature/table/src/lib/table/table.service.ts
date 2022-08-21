import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import { CreateTableResponse, GetTableResponse, TableId } from '@poker-moons/shared/type';
import { TableStateManagerService } from '../table-state-manager/table-state-manager.service';

@Injectable()
export class TableService {
    private logger = new CustomLoggerService(TableService.name);

    constructor(private readonly tableStateManagerService: TableStateManagerService) {}

    async create(): Promise<CreateTableResponse> {
        this.logger.log('Creating new table');
        return await this.tableStateManagerService.createNewTable();
    }

    async get(id: TableId): Promise<GetTableResponse> {
        // If table doesn't exist throws error
        await this.tableStateManagerService.getTableById(id);
        this.logger.log('Got table: ' + id);

        return {
            id: id,
        };
    }

    async delete(id: TableId): Promise<TableId> {
        await this.tableStateManagerService.deleteTable(id);
        this.logger.log('Deleted table with id: ' + id);
        return id;
    }
}
