import { Module } from '@nestjs/common';
import { TableGateway } from './table.gateway';
import { TableGatewayService } from './table-gateway.service';

@Module({
    providers: [TableGateway, TableGatewayService],
    exports: [TableGatewayService],
})
export class TableGatewayModule { }