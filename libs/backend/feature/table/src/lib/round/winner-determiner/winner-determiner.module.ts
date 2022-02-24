import { Module } from '@nestjs/common';
import { TableGatewayModule } from '../../shared/websocket/table-gateway.module';
import { TableStateManagerModule } from '../../table-state-manager/table-state-manager.module';
import { PotManagerModule } from '../pot-manager/pot-manager.module';
import { WinnerDeterminerService } from './winner-determiner.service';

@Module({
    imports: [TableGatewayModule, TableStateManagerModule, PotManagerModule],
    providers: [WinnerDeterminerService],
    exports: [WinnerDeterminerService],
})
export class WinnerDeterminerModule {}
