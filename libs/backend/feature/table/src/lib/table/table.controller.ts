import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import { CreateTableResponse, GetTableResponse, TableId } from '@poker-moons/shared/type';
import { TableService } from './table.service';
import { TableIdValidator } from './table.validator';

@Controller()
export class TableController {
    private logger = new CustomLoggerService(TableController.name);

    constructor(private readonly tableService: TableService) {}

    @Post()
    create(): Promise<CreateTableResponse> {
        this.logger.debug('Received create table request');
        return this.tableService.create();
    }

    @Get(':tableId')
    get(@Param() { tableId }: TableIdValidator): Promise<GetTableResponse> {
        this.logger.debug('Received get table request for: ' + tableId);
        return this.tableService.get(tableId);
    }

    @Delete(':tableId')
    delete(@Param() { tableId }: TableIdValidator): Promise<TableId> {
        this.logger.debug('Received delete table request for: ' + tableId);
        return this.tableService.delete(tableId);
    }
}
