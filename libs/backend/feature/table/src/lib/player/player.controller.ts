import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import type { GetPlayerCardsResponse, JoinTableResponse, LeaveTableResponse, ToggleReadyStatusResponse } from '@poker-moons/shared/type';
import { PlayerService } from './player.service';
import {
    GetPlayerCardsRequestValidator,
    JoinTableParamValidator,
    JoinTableRequestValidator,
    LeaveTableRequestValidator,
} from './player.validator';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import { TableIdValidator } from '../table/table.validator';

@Controller()
export class PlayerController {
    private logger = new CustomLoggerService(PlayerController.name);

    constructor(private readonly playerService: PlayerService) {}

    @Post()
    create(
        @Body() dto: JoinTableRequestValidator,
        @Param() { tableId }: JoinTableParamValidator
    ): Promise<JoinTableResponse> {
        this.logger.debug('Received create player request: ' + dto);
        return this.playerService.create(dto, tableId);
    }

    @Put(':playerId')
    leave(@Param() { tableId, playerId }: LeaveTableRequestValidator): Promise<LeaveTableResponse> {
        this.logger.debug('Received leave table request: ' + tableId + ', ' + playerId);
        return this.playerService.delete(tableId, playerId);
    }

    @Get(':playerId/cards')
    getCards(@Param() { tableId, playerId }: GetPlayerCardsRequestValidator): Promise<GetPlayerCardsResponse> {
        this.logger.debug('Received get cards request: ' + tableId + ', ' + playerId);
        return this.playerService.getCards(tableId, playerId);
    }

    @Put(':playerId/ready-status')
    ready(@Param() { tableId, playerId }: ToggleReadyStatusRequestValidator): Promise<ToggleReadyStatusResponse> {
        this.logger.debug('Received player ready update request: ' + tableId + ', ' + playerId);
        return this.playerService.ready(tableId, playerId);
    }
}
