import { Module } from '@nestjs/common';
import { TableStateManagerService } from './table-state-manager.service';
import { BackendFeatureStateModule } from '@poker-moons/backend/feature/state';

@Module({
    providers: [TableStateManagerService],
    imports: [BackendFeatureStateModule],
})
export class TableStateManagerModule {}
