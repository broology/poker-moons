import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import type { GetPlayerCardsResponse, JoinTableResponse, LeaveTableResponse } from '@poker-moons/shared/type';
import { PlayerService } from './player.service';
import {
    GetPlayerCardsRequestValidator,
    JoinTableRequestValidator,
    LeaveTableRequestValidator,
} from './player.validator';

@Controller()
export class PlayerController {
    constructor(private readonly playerService: PlayerService) {}

    @Post()
    create(@Body() dto: JoinTableRequestValidator): JoinTableResponse {
        return this.playerService.create(dto);
    }

    @Put(':playerId')
    leave(@Param() { tableId, playerId }: LeaveTableRequestValidator): LeaveTableResponse {
        return this.playerService.delete(tableId, playerId);
    }

    @Get(':playerId/cards')
    getCards(@Param() { tableId, playerId }: GetPlayerCardsRequestValidator): GetPlayerCardsResponse {
        return this.playerService.getCards(tableId, playerId);
    }
}
