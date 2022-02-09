import { Module } from '@nestjs/common';
import { AIPlayerService } from './ai-player.service';

@Module ({
    'providers' : [AIPlayerService],
    'exports' : [AIPlayerService]
})

export class AIPlayerModule{}
