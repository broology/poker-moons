import { Module } from '@nestjs/common';
import { ReadySystemModule } from '../shared/ready-system/ready-system.module';
import { TableGatewayModule } from '../shared/websocket/table-gateway.module';
import { TableStateManagerModule } from '../table-state-manager/table-state-manager.module';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

@Module({
    imports: [ReadySystemModule, TableGatewayModule, TableStateManagerModule],
    controllers: [PlayerController],
    providers: [PlayerService],
})
export class PlayerModule {}
