import { PlayerOrientation } from '@poker-moons/frontend/shared/ui';

type Style = Record<string, unknown>;

export type StyleComponent = keyof SeatActionOrientationTransform;

export interface SeatActionOrientationTransform {
    cards: Style;
    stack: Style;
    called: Style;
}

export const seatActionOrientationTransform: Record<PlayerOrientation, SeatActionOrientationTransform> = {
    bottom: {
        cards: {
            ['background-color']: '#000',
        },
        stack: { ['background-color']: '#000' },
        called: { ['background-color']: '#000' },
    },
    bottomLeft: {
        cards: { ['background-color']: '#000' },
        stack: { ['background-color']: '#000' },
        called: { ['background-color']: '#000' },
    },
    bottomRight: {
        cards: { ['background-color']: '#000' },
        stack: { ['background-color']: '#000' },
        called: { ['background-color']: '#000' },
    },
    left: {
        cards: { ['background-color']: '#000' },
        stack: { ['background-color']: '#000' },
        called: { ['background-color']: '#000' },
    },
    right: {
        cards: { ['background-color']: '#000' },
        stack: { ['background-color']: '#000' },
        called: { ['background-color']: '#000' },
    },
    top: {
        cards: { ['background-color']: '#000' },
        stack: { ['background-color']: '#000' },
        called: { ['background-color']: '#000' },
    },
    topLeft: {
        cards: { ['background-color']: '#000' },
        stack: { ['background-color']: '#000' },
        called: { ['background-color']: '#000' },
    },
    topRight: {
        cards: { ['background-color']: '#000' },
        stack: { ['background-color']: '#000' },
        called: { ['background-color']: '#000' },
    },
};
