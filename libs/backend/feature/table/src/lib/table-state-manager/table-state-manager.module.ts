import { Module } from '@nestjs/common';
import { TableStateManagerService } from './table-state-manager.service';
import { BackendDataAccessStateModule } from '@poker-moons/backend/data-access/state';

@Module({
    providers: [TableStateManagerService],
    imports: [BackendDataAccessStateModule],
    exports: [TableStateManagerService],
})
export class TableStateManagerModule {}
