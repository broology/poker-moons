import { Module } from '@nestjs/common';
import { PotManagerModule } from '../round/pot-manager/pot-manager.module';
import { RoundManagerModule } from '../round/round-manager/round-manager.module';
import { TurnTimerModule } from '../shared/turn-timer/turn-timer.module';
import { TableGatewayModule } from '../shared/websocket/table-gateway.module';
import { TableStateManagerModule } from '../table-state-manager/table-state-manager.module';
import { AllInActionHandlerService } from './handlers/all-in/all-in-action-handler.service';
import { CallActionHandlerService } from './handlers/call/call-action-handler.service';
import { CheckActionHandlerService } from './handlers/check/check-action-handler.service';
import { FoldActionHandlerService } from './handlers/fold/fold-action-handler.service';
import { RaiseActionHandlerService } from './handlers/raise/raise-action-handler.service';
import { PlayerActionController } from './player-action.controller';
import { PlayerActionService } from './player-action.service';

@Module({
    imports: [TableGatewayModule, TableStateManagerModule, PotManagerModule, RoundManagerModule, TurnTimerModule],
    controllers: [PlayerActionController],
    providers: [
        PlayerActionService,
        AllInActionHandlerService,
        CallActionHandlerService,
        CheckActionHandlerService,
        FoldActionHandlerService,
        RaiseActionHandlerService,
    ],
})
export class PlayerActionModule {}
