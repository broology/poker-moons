import { Body, Controller, Post } from '@nestjs/common';
import { JoinTableResponse } from '@poker-moons/shared/type';
import { PlayerService } from './player.service';
import { JoinTableRequestValidator,  } from './player.validator';

@Controller('player')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) {}

    @Post()
    create(@Body() dto: JoinTableRequestValidator): JoinTableResponse {
        return this.playerService.create(dto);
    }
}
