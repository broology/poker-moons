import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTableResponse, GetTableResponse, UpdateTableResponse } from '@poker-moons/shared/type';
import { TableService } from './table.service';
import {
    CreateTableRequestValidator,
    GetTableRequestValidator,
    UpdateTableRequestValidator,
} from '@poker-moons/backend/shared/util/validators';

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

    @Put(':tableId')
    update(@Body() dto: UpdateTableRequestValidator): UpdateTableResponse {
        return this.tableService.update(dto);
    }
}
