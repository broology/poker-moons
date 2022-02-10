import { Body, Controller, Post, Put, Get, Param } from '@nestjs/common';
import type { JoinTableResponse, LeaveTableResponse, GetPlayerCardsResponse } from '@poker-moons/shared/type';
import { PlayerService } from './player.service';
import { JoinTableRequestValidator, LeaveTableRequestValidator, GetPlayerCardsRequestValidator } from './player.validator';

@Controller()
export class PlayerController {
    constructor(private readonly playerService: PlayerService) {}

    @Post()
    create(@Body() dto: JoinTableRequestValidator): JoinTableResponse {
        return this.playerService.create(dto);
    }
  
    @Put(':playerId')
    leave(@Param() {tableId, playerId}: LeaveTableRequestValidator): LeaveTableResponse {
        return this.playerService.delete(tableId, playerId);
    }
  
    @Get(':playerId/cards')
    getCards(@Param() {tableId, playerId}: GetPlayerCardsRequestValidator): GetPlayerCardsResponse {
        return this.playerService.getCards(tableId, playerId);
    }
}
