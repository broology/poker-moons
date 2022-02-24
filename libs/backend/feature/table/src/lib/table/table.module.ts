import { Module } from '@nestjs/common';
import { TableStateManagerModule } from '../table-state-manager/table-state-manager.module';
import { TableController } from './table.controller';
import { TableService } from './table.service';

@Module({
    imports: [TableStateManagerModule],
    controllers: [TableController],
    providers: [TableService],
})
export class TableModule {}
