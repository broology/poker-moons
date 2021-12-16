import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTableResponse, GetTableResponse, UpdateTableResponse } from '@poker-moons/shared/type';
import { TableService } from './table.service';
import { CreateTableRequestValidator, TableIdValidator, UpdateTableRequestValidator } from './table.validator';

@Controller()
export class TableController {
    constructor(private readonly tableService: TableService) {}

    @Post()
    create(@Body() dto: CreateTableRequestValidator): CreateTableResponse {
        return this.tableService.create(dto);
    }

    @Get(':tableId')
    get(@Param() { tableId }: TableIdValidator): GetTableResponse {
        return this.tableService.get(tableId);
    }

    @Put(':tableId')
    update(@Param() { tableId }: TableIdValidator, @Body() dto: UpdateTableRequestValidator): UpdateTableResponse {
        return this.tableService.update(tableId, dto);
    }
}
