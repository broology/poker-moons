import { Module } from '@nestjs/common';
import { TurnTimerModule } from '../../shared/turn-timer/turn-timer.module';
import { TableGatewayModule } from '../../shared/websocket/table-gateway.module';
import { TableStateManagerModule } from '../../table-state-manager/table-state-manager.module';
import { DeckManagerModule } from '../deck-manager/deck-manager.module';
import { WinnerDeterminerModule } from '../winner-determiner/winner-determiner.module';
import { RoundManagerService } from './round-manager.service';

@Module({
    imports: [DeckManagerModule, TableGatewayModule, TableStateManagerModule, TurnTimerModule, WinnerDeterminerModule],
    providers: [RoundManagerService],
    exports: [RoundManagerService],
})
export class RoundManagerModule {}
