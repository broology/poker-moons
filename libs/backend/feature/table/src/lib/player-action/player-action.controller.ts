import { Body, Controller, Post } from '@nestjs/common';
import { PerformPlayerActionResponse } from '@poker-moons/shared/type';
import { PlayerActionService } from './player-action.service';
import { PerformPlayerActionRequestValidator } from './player-action.validator';

@Controller()
export class PlayerActionController {
    constructor(private readonly playerActionService: PlayerActionService) {}

    @Post()
    perform(@Body() dto: PerformPlayerActionRequestValidator): PerformPlayerActionResponse {
        return this.playerActionService.perform(dto);
    }
}
