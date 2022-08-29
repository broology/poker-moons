import { Module } from '@nestjs/common';
import { TableStateManagerModule } from '../../table-state-manager/table-state-manager.module';
import { PlayerAccessGuard } from './player-access.guard';

@Module({
    imports: [TableStateManagerModule],
    providers: [PlayerAccessGuard],
    exports: [PlayerAccessGuard],
})
export class PlayerAccessModule {}
