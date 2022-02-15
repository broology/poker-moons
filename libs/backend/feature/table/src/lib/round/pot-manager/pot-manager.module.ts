import { Module } from '@nestjs/common';
import { TableStateManagerModule } from '../../table-state-manager/table-state-manager.module';
import { PotManagerService } from './pot-manager.service';

@Module({
    imports: [TableStateManagerModule],
    providers: [PotManagerService],
    exports: [PotManagerService],
})
export class PotManagerModule {}
