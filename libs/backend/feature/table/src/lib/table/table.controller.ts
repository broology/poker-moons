import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTableResponse, GetTableResponse } from '@poker-moons/shared/type';
import { TableService } from './table.service';
import { CreateTableRequestValidator, TableIdValidator } from './table.validator';

@Controller()
export class TableController {
    constructor(private readonly tableService: TableService) {}

    @Post()
    async create(@Body() dto: CreateTableRequestValidator): Promise<CreateTableResponse> {
        return this.tableService.create(dto);
    }

    @Get(':tableId')
    async get(@Param() { tableId }: TableIdValidator): Promise<GetTableResponse> {
        return this.tableService.get(tableId);
    }
}
