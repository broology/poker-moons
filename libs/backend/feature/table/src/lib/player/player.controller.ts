import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CustomLoggerService } from '@poker-moons/backend/utility';
import type {
    GetPlayerCardsResponse,
    JoinTableResponse,
    LeaveTableResponse,
    ToggleReadyStatusResponse,
} from '@poker-moons/shared/type';
import { PlayerAccessGuard } from '../shared/authentication/player-access.guard';
import { PlayerService } from './player.service';
import {
    GetPlayerCardsRequestValidator,
    JoinTableParamValidator,
    JoinTableRequestValidator,
    LeaveTableRequestValidator,
    ToggleReadyStatusRequestValidator,
} from './player.validator';

@Controller()
export class PlayerController {
    private logger = new CustomLoggerService(PlayerController.name);

    constructor(private readonly playerService: PlayerService) {}

    @Post()
    create(
        @Body() dto: JoinTableRequestValidator,
        @Param() { tableId }: JoinTableParamValidator,
    ): Promise<JoinTableResponse> {
        this.logger.debug('Received create player request: ' + JSON.stringify(dto, null, 2));
        return this.playerService.create(dto, tableId);
    }

    @Put(':playerId')
    @UseGuards(PlayerAccessGuard)
    leave(@Param() { tableId, playerId }: LeaveTableRequestValidator): Promise<LeaveTableResponse> {
        this.logger.debug('Received leave table request: ' + tableId + ', ' + playerId);
        return this.playerService.delete(tableId, playerId);
    }

    @Get(':playerId/cards')
    @UseGuards(PlayerAccessGuard)
    getCards(@Param() { tableId, playerId }: GetPlayerCardsRequestValidator): Promise<GetPlayerCardsResponse> {
        this.logger.debug('Received get cards request: ' + tableId + ', ' + playerId);
        return this.playerService.getCards(tableId, playerId);
    }

    @Put(':playerId/ready-status')
    @UseGuards(PlayerAccessGuard)
    ready(@Param() { tableId, playerId }: ToggleReadyStatusRequestValidator): Promise<ToggleReadyStatusResponse> {
        this.logger.debug('Received player ready update request: ' + tableId + ', ' + playerId);
        return this.playerService.ready(tableId, playerId);
    }
}
