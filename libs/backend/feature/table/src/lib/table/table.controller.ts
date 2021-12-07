import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTableResponse, GetTableResponse } from '@poker-moons/shared/type';
import { TableService } from './table.service';
import { CreateTableRequestValidator, GetTableRequestValidator } from '@poker-moons/backend/shared/util/validators';

@Controller()
export class TableController {
    constructor(private readonly tableService: TableService) {}

    @Post()
    create(@Body() dto: CreateTableRequestValidator): CreateTableResponse {
        return this.tableService.create(dto);
    }

    @Get(':tableId')
    get(@Param() { id }: GetTableRequestValidator): GetTableResponse {
        return this.tableService.get(id);
    }
}
