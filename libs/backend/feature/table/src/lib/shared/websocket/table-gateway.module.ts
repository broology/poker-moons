import { Module } from '@nestjs/common';
import { TableGateway } from './table.gateway';
import { TableGatewayService } from './table-gateway.service';
import { TableStateManagerModule } from '../../table-state-manager/table-state-manager.module';

@Module({
    imports: [TableStateManagerModule],
    providers: [TableGateway, TableGatewayService],
    exports: [TableGatewayService],
})
export class TableGatewayModule {}
