import { Injectable, NotImplementedException } from '@nestjs/common'
import { Card, AIPlayer, SharedTableState, Table, Round, PersonalityTrait, Difficulty } from '@poker-moons/shared/type';

@Injectable
export class AIPlayerService{

    create(personality: PersonalityTrait[], difficulty: Difficulty): AIPlayer {
        throw new NotImplementedException;
        
    }

}
