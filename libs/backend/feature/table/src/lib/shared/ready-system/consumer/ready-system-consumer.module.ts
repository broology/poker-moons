import { Module } from '@nestjs/common';
import { JobSchedulerModule } from '@poker-moons/backend/shared/service/job-scheduler';
import { RoundManagerModule } from '../../../round/round-manager/round-manager.module';
import { TableStateManagerModule } from '../../../table-state-manager/table-state-manager.module';
import { TableGatewayModule } from '../../websocket/table-gateway.module';
import { ReadySystemConsumer } from './ready-system-consumer.service';

@Module({
    imports: [JobSchedulerModule, RoundManagerModule, TableGatewayModule, TableStateManagerModule],
    providers: [ReadySystemConsumer],
    exports: [ReadySystemConsumer],
})
export class ReadySystemConsumerModule {}
