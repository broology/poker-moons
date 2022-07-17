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
        cards: { ['top.px']: -210, ['left.px']: 62.5 },
        stack: { ['top.px']: -160, ['left.px']: 230 },
        called: { ['top.px']: -250, ['left.px']: 15 },
    },
    bottomLeft: {
        cards: { ['top.px']: -130, ['left.px']: 220 },
        stack: { ['top.px']: -100, ['left.px']: 245 },
        called: { ['top.px']: -250, ['left.px']: 350 },
    },
    bottomRight: {
        cards: { ['top.px']: -90, ['left.px']: -40 },
        stack: { ['top.px']: -100, ['left.px']: -255 },
        called: { ['top.px']: -250, ['left.px']: -360 },
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
        cards: { ['top.px']: 120, ['left.px']: 157 },
        stack: { ['top.px']: 0, ['left.px']: -280 },
        called: { ['top.px']: 110, ['left.px']: -32 },
    },
    topLeft: {
        cards: { ['top.px']: 120, ['left.px']: 310 },
        stack: { ['top.px']: -10, ['left.px']: 245 },
        called: { ['top.px']: 80, ['left.px']: 382.5 },
    },
    topRight: {
        cards: { ['top.px']: 150, ['left.px']: 5 },
        stack: { ['top.px']: -10, ['left.px']: -285 },
        called: { ['top.px']: 80, ['left.px']: -420 },
    },
};
