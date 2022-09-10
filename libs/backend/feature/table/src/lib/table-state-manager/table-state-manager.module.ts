import { Module } from '@nestjs/common';
import { BackendDataAccessStateModule } from '@poker-moons/backend/data-access/state';
import { TableStateManagerService } from './table-state-manager.service';

@Module({
    imports: [BackendDataAccessStateModule],
    providers: [TableStateManagerService],
    exports: [TableStateManagerService],
})
export class TableStateManagerModule {}
