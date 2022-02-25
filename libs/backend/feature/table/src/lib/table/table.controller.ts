import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTableResponse, GetTableResponse } from '@poker-moons/shared/type';
import { TableService } from './table.service';
import { CreateTableRequestValidator, TableIdValidator } from './table.validator';
import { CustomLoggerService } from '@poker-moons/backend/utility';

@Controller()
export class TableController {
    private logger = new CustomLoggerService(TableController.name);

    constructor(private readonly tableService: TableService) {}

    @Post()
    create(@Body() dto: CreateTableRequestValidator): Promise<CreateTableResponse> {
        this.logger.warn('FUCK YOU');
        return this.tableService.create(dto);
    }

    @Get(':tableId')
    get(@Param() { tableId }: TableIdValidator): Promise<GetTableResponse> {
        return this.tableService.get(tableId);
    }
}
