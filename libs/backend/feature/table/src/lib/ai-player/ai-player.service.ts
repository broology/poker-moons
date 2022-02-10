import { Injectable, NotImplementedException } from '@nestjs/common'
import { Card, AIPlayer, SharedTableState, Table, Round, PersonalityTrait } from "@poker-moons/shared/type";

@Injectable
export class AIPlayerService{

    create(personality: PersonalityTrait[], difficulty: ): AIPlayer {
        throw new NotImplementedException;
        
    }

}