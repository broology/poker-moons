import { Module } from '@nestjs/common';
import { PlayerActionController } from './player-action.controller';
import { PlayerActionService } from './player-action.service';

@Module({
    controllers: [PlayerActionController],
    providers: [PlayerActionService],
})
export class PlayerActionModule {}
