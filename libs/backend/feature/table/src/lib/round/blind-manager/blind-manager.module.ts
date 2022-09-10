import { Module } from '@nestjs/common';
import { TableGatewayModule } from '../../shared/websocket/table-gateway.module';
import { TableStateManagerModule } from '../../table-state-manager/table-state-manager.module';
import { PotManagerModule } from '../pot-manager/pot-manager.module';
import { BlindManagerService } from './blind-manager.service';

@Module({
    imports: [TableStateManagerModule, TableGatewayModule, PotManagerModule],
    providers: [BlindManagerService],
    exports: [BlindManagerService],
})
export class BlindManagerModule {}
