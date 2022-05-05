import { Module } from '@nestjs/common';
import { JobSchedulerModule } from '@poker-moons/backend/shared/service/job-scheduler';
import { PlayerActionModule } from '../../player-action/player-action.module';
import { TableStateManagerModule } from '../../table-state-manager/table-state-manager.module';
import { TableGatewayModule } from '../websocket/table-gateway.module';
import { TurnTimerService } from './turn-timer.service';

@Module({
    imports: [JobSchedulerModule, TableGatewayModule, TableStateManagerModule, PlayerActionModule],
    providers: [TurnTimerService],
    exports: [TurnTimerService],
})
export class TurnTimerModule {}
