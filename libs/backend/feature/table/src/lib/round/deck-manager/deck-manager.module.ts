import { Module } from '@nestjs/common';
import { DeckManagerService } from './deck-manager.service';

@Module({
    providers: [DeckManagerService],
    exports: [DeckManagerService],
})
export class DeckManagerModule {}
