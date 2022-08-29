import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import { PerformPlayerActionResponse } from '@poker-moons/shared/type';
import { PlayerAccessGuard } from '../shared/authentication/player-access.guard';
import { PlayerActionService } from './player-action.service';
import { PerformPlayerActionParamValidator, PerformPlayerActionRequestValidator } from './player-action.validator';

@Controller()
export class PlayerActionController {
    private logger = new CustomLoggerService(PlayerActionController.name);

    constructor(private readonly playerActionService: PlayerActionService) {}

    @Post()
    @UseGuards(PlayerAccessGuard)
    perform(
        @Param() { tableId, playerId }: PerformPlayerActionParamValidator,
        @Body() dto: PerformPlayerActionRequestValidator,
    ): Promise<PerformPlayerActionResponse> {
        this.logger.debug('Received perform action request: ' + dto);
        return this.playerActionService.perform(tableId, playerId, dto);
    }
}
