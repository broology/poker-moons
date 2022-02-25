import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import type { GetPlayerCardsResponse, JoinTableResponse, LeaveTableResponse } from '@poker-moons/shared/type';
import { PlayerService } from './player.service';
import {
    GetPlayerCardsRequestValidator,
    JoinTableRequestValidator,
    LeaveTableRequestValidator,
} from './player.validator';
import { CustomLoggerService } from '@poker-moons/backend/utility';

@Controller()
export class PlayerController {
    private logger = new CustomLoggerService(PlayerController.name);

    constructor(private readonly playerService: PlayerService) {}

    @Post()
    create(@Body() dto: JoinTableRequestValidator): JoinTableResponse {
        this.logger.debug('Received create table request: ' + dto);
        return this.playerService.create(dto);
    }

    @Put(':playerId')
    leave(@Param() { tableId, playerId }: LeaveTableRequestValidator): LeaveTableResponse {
        this.logger.debug('Received leave table request: ' + tableId + ', ' + playerId);
        return this.playerService.delete(tableId, playerId);
    }

    @Get(':playerId/cards')
    getCards(@Param() { tableId, playerId }: GetPlayerCardsRequestValidator): GetPlayerCardsResponse {
        this.logger.debug('Received get cards request: ' + tableId + ', ' + playerId);
        return this.playerService.getCards(tableId, playerId);
    }
}
