import { Module } from '@nestjs/common';
import { JobSchedulerModule } from '@poker-moons/backend/shared/service/job-scheduler';
import { PlayerActionModule } from '../../../player-action/player-action.module';
import { TableStateManagerModule } from '../../../table-state-manager/table-state-manager.module';
import { TableGatewayModule } from '../../websocket/table-gateway.module';
import { TurnTimerServiceConsumer } from './turn-timer-consumer.service';

@Module({
    imports: [PlayerActionModule, TableGatewayModule, TableStateManagerModule, JobSchedulerModule],
    providers: [TurnTimerServiceConsumer],
    exports: [TurnTimerServiceConsumer],
})
export class TurnTimerConsumerModule {}
