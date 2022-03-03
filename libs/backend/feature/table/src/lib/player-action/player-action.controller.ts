import { Body, Controller, Param, Post } from '@nestjs/common';
import { PerformPlayerActionResponse } from '@poker-moons/shared/type';
import { PlayerActionService } from './player-action.service';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import { PerformPlayerActionParamValidator, PerformPlayerActionRequestValidator } from './player-action.validator';

@Controller()
export class PlayerActionController {
    private logger = new CustomLoggerService(PlayerActionController.name);

    constructor(private readonly playerActionService: PlayerActionService) {}

    @Post()
    perform(
        @Param() { tableId, playerId }: PerformPlayerActionParamValidator,
        @Body() dto: PerformPlayerActionRequestValidator,
    ): Promise<PerformPlayerActionResponse> {
        this.logger.debug('Received perform action request: ' + dto);
        return this.playerActionService.perform(tableId, playerId, dto);
    }
}
