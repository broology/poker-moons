import { Body, Controller, Post, Put, Get, Param } from '@nestjs/common';
import { JoinTableResponse, LeaveTableResponse, GetPlayerCardsResponse } from '@poker-moons/shared/type';
import { PlayerService } from './player.service';
import { JoinTableRequestValidator, LeaveTableRequestValidator, GetPlayerCardsRequestValidator } from './player.validator';

@Controller('player')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) {}

    @Post()
    create(@Body() dto: JoinTableRequestValidator): JoinTableResponse {
        return this.playerService.create(dto);
    }
  
    @Put(':tableId', ':playerId')
    delete(@Param() {tableId, playerId}: LeaveTableRequestValidator): LeaveTableResponse {
        return this.playerService.delete(tableId, playerId);
    }
  
    @Get(':tableId', ':playerId')
    getCards(@Param() {tableId, playerId}: GetPlayerCardsRequestValidator): GetPlayerCardsResponse {
        return this.playerService.getCards(tableId, playerId);
    }
}
