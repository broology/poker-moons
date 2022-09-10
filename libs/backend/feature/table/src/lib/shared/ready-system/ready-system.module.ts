import { Module } from '@nestjs/common';
import { JobSchedulerModule } from '@poker-moons/backend/shared/service/job-scheduler';
import { TableStateManagerModule } from '../../table-state-manager/table-state-manager.module';
import { TableGatewayModule } from '../websocket/table-gateway.module';
import { ReadySystemService } from './ready-system.service';

@Module({
    imports: [JobSchedulerModule, TableGatewayModule, TableStateManagerModule],
    providers: [ReadySystemService],
    exports: [ReadySystemService],
})
export class ReadySystemModule {}
