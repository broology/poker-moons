import { Module } from '@nestjs/common';
import { TableStateManagerModule } from '../../table-state-manager/table-state-manager.module';
import { DeckManagerService } from './deck-manager.service';

@Module({
    imports: [TableStateManagerModule],
    providers: [DeckManagerService],
    exports: [DeckManagerService],
})
export class DeckManagerModule {}
