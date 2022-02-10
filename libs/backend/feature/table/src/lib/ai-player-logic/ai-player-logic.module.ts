import { Module } from '@nestjs/common';
import { AIPlayerLogicService } from './ai-player-logic.service';

@Module ({
    'providers' : [AIPlayerLogicService],
    'exports' : [AIPlayerLogicService]
})

export class AIPlayerLogicModule{}
