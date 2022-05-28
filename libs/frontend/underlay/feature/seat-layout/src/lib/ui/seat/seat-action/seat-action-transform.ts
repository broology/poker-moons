import { PlayerOrientation } from '@poker-moons/frontend/shared/ui';

type Style = Record<string, unknown>;

export type StyleComponent = keyof SeatActionOrientationTransform;

/**
 * @description Orientation NgStyles to be applied to each component given the {@link PlayerOrientation}.
 * - `cards`: The pair of cards of the player
 * - `stack`: The stack of chips of the player
 * - `called`: The chips called by the player
 */
export interface SeatActionOrientationTransform {
    cards: Style;
    stack: Style;
    called: Style;
}

export const seatActionOrientationTransform: Record<PlayerOrientation, SeatActionOrientationTransform> = {
    bottom: {
        cards: { ['top.px']: 70, ['left.px']: 175 },
        stack: { ['top.px']: 50, ['left.px']: 290 },
        called: { ['top.px']: -120, ['left.px']: 88 },
    },
    bottomLeft: {
        cards: { ['top.px']: 95, ['left.px']: 240 },
        stack: { ['top.px']: 140, ['left.px']: 240 },
        called: { ['top.px']: -90, ['left.px']: 280 },
    },
    bottomRight: {
        cards: { ['top.px']: 130, ['left.px']: 130 },
        stack: { ['top.px']: 140, ['left.px']: -60 },
        called: { ['top.px']: -90, ['left.px']: -100 },
    },
    left: {
        cards: { ['top.px']: -230, ['left.px']: 60 },
        stack: { ['top.px']: 25, ['left.px']: 210 },
        called: { ['top.px']: 210, ['left.px']: 300 },
    },
    right: {
        cards: { ['top.px']: -230, ['left.px']: -160 },
        stack: { ['top.px']: 25, ['left.px']: -40 },
        called: { ['top.px']: 210, ['left.px']: -120 },
    },
    top: {
        cards: { ['top.px']: 150, ['left.px']: 280 },
        stack: { ['top.px']: 0, ['left.px']: -100 },
        called: { ['top.px']: 200, ['left.px']: 88 },
    },
    topLeft: {
        cards: { ['top.px']: 160, ['left.px']: 310 },
        stack: { ['top.px']: 25, ['left.px']: 240 },
        called: { ['top.px']: 210, ['left.px']: 300 },
    },
    topRight: {
        cards: { ['top.px']: 200, ['left.px']: 220 },
        stack: { ['top.px']: 25, ['left.px']: -60 },
        called: { ['top.px']: 210, ['left.px']: -120 },
    },
};
