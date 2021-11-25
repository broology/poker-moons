import { Body, Controller, Post } from "@nestjs/common";
import { CreateTableResponse } from "@poker-moons/shared/type";
import { TableService } from "./table.service";
import { CreateTableRequestValidator } from "./table.validator";

@Controller('table')
export class TableController {
    constructor(private readonly tableService: TableService) {}

    @Post()
    create(@Body() dto: CreateTableRequestValidator): CreateTableResponse {
        return this.tableService.create(dto);
    }

    @Get(':id')
    getTableById(@Param() { id }: GetTableRequestValidator): GetTableResponse {
        return this.tableService.get(id);
    }
}
