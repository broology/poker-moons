import { Player } from '@poker-moons/shared/type';
import { Card } from './card';
import { SeatId } from './table';

export const personalityTrait = ["Risky", "Passive", "Big Better", "SunkenCost", "Survivor", "Bloodthirsty"];
export type PersonalityTrait = typeof personalityTrait[number];

export const difficulty = ["Easy", "Normal", "Hard" , "Chad"];
export type Difficulty = typeof difficulty[number];

export type BasePlayer = Pick<Player, "id" | "cards" | "stack" | "status" | "called">;

export interface AIPlayer extends BasePlayer {

    difficulty: Difficulty;
    difficultyFactor: number;
    riskFactor: number;
    personalityTraits: PersonalityTrait[];

};