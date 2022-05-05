import { Module } from '@nestjs/common';
import { JobSchedulerModule } from '@poker-moons/backend/shared/service/job-scheduler';
import { RoundManagerModule } from '../../round/round-manager/round-manager.module';
import { TableStateManagerModule } from '../../table-state-manager/table-state-manager.module';
import { TableGatewayModule } from '../websocket/table-gateway.module';
import { ReadySystemConsumer } from './ready-system.consumer';
import { ReadySystemService } from './ready-system.service';

@Module({
    imports: [JobSchedulerModule, TableGatewayModule, TableStateManagerModule, RoundManagerModule],
    providers: [ReadySystemService, ReadySystemConsumer],
    exports: [ReadySystemService],
})
export class ReadySystemModule {}
