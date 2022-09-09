import { Module } from '@nestjs/common';
import { TableStateManagerService } from '../../table-state-manager/table-state-manager.service';
import { TableGatewayService } from '../../shared/websocket/table-gateway.service';
import { PotManagerService } from '../pot-manager/pot-manager.service';
import { BlindManagerService } from './blind-manager.service';

@Module({
    imports: [TableStateManagerService, TableGatewayService, PotManagerService],
    providers: [BlindManagerService],
    exports: [BlindManagerService],
})
export class BlindManagerModule {}
