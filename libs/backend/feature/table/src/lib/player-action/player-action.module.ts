import { Module } from '@nestjs/common';
import { TableStateManagerModule } from '../table-state-manager/table-state-manager.module';
import { AllInActionHandlerService } from './handlers/all-in/all-in-action-handler.service';
import { CallActionHandlerService } from './handlers/call/call-action-handler.service';
import { CheckActionHandlerService } from './handlers/check/check-action-handler.service';
import { FoldActionHandlerService } from './handlers/fold/fold-action-handler.service';
import { RaiseActionHandlerService } from './handlers/raise/raiser-action-handler.service';
import { PlayerActionController } from './player-action.controller';
import { PlayerActionService } from './player-action.service';

@Module({
    imports: [TableStateManagerModule],
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
