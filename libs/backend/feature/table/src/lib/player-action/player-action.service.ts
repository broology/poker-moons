import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import {
    PerformPlayerActionRequest,
    PerformPlayerActionResponse,
    PlayerId,
    ServerTableState,
    TableId,
} from '@poker-moons/shared/type';
import { pipe } from 'fp-ts/lib/function';
import { TableStateManagerService } from '../table-state-manager/table-state-manager.service';
import { AllInActionHandlerService } from './handlers/all-in/all-in-action-handler.service';
import { CallActionHandlerService } from './handlers/call/call-action-handler.service';
import { CheckActionHandlerService } from './handlers/check/check-action-handler.service';
import { FoldActionHandlerService } from './handlers/fold/fold-action-handler.service';
import { RaiseActionHandlerService } from './handlers/raise/raise-action-handler.service';

@Injectable()
export class PlayerActionService {
    private logger = new CustomLoggerService(PlayerActionService.name);

    constructor(
        private readonly allInActionHandlerService: AllInActionHandlerService,
        private readonly callActionHandlerService: CallActionHandlerService,
        private readonly checkActionHandlerService: CheckActionHandlerService,
        private readonly foldActionHandlerService: FoldActionHandlerService,
        private readonly raiseActionHandlerService: RaiseActionHandlerService,
        private readonly tableStateManagerService: TableStateManagerService,
    ) {}

    async perform(
        tableId: TableId,
        playerId: PlayerId,
        dto: PerformPlayerActionRequest,
    ): Promise<PerformPlayerActionResponse> {
        const table: ServerTableState = await this.tableStateManagerService.getTableById(tableId);
        const player = table.playerMap[playerId];

        switch (dto.action.type) {
            case 'all-in':
                pipe(
                    this.allInActionHandlerService.canAllIn(table, player, dto.action),
                    async (...args) => await this.allInActionHandlerService.allIn(...args),
                );
                break;
            case 'call':
                pipe(
                    this.callActionHandlerService.canCall(table, player, dto.action),
                    async (...args) => await this.callActionHandlerService.call(...args),
                );
                break;
            case 'check':
                pipe(
                    this.checkActionHandlerService.canCheck(table, player, dto.action),
                    async (...args) => await this.checkActionHandlerService.check(...args),
                );
                break;
            case 'fold':
                pipe(
                    this.foldActionHandlerService.canFold(table, player, dto.action),
                    async (...args) => await this.foldActionHandlerService.fold(...args),
                );
                break;
            case 'raise':
                pipe(
                    this.raiseActionHandlerService.canRaise(table, player, dto.action),
                    async (...args) => await this.raiseActionHandlerService.raise(...args),
                );
                break;
        }
    }
}
