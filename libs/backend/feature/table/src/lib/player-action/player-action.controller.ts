import { Body, Controller, Post } from '@nestjs/common';
import { PerformPlayerActionResponse } from '@poker-moons/shared/type';
import { PlayerActionService } from './player-action.service';
import { PerformPlayerActionRequestValidator } from './player-action.validator';
import { CustomLoggerService } from '@poker-moons/backend/utility';

@Controller()
export class PlayerActionController {
    private logger = new CustomLoggerService(PlayerActionController.name);

    constructor(private readonly playerActionService: PlayerActionService) {}

    @Post()
    perform(@Body() dto: PerformPlayerActionRequestValidator): PerformPlayerActionResponse {
        this.logger.debug('Received perform action request: ' + dto);
        return this.playerActionService.perform(dto);
    }
}
