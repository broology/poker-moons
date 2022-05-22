import { PlayerOrientation } from '../shared/type';

/**
 * @description The transforms to the displayed chips depending on the `PlayerOrientation`.
 *
 * - `invert`: Inverts the by the axis given
 * - `offset`: Applies an offset to the axis given `once`.
 * - `delta`: Applies an offset to the axis given for each chip stack, for each `col`/`row`
 */
interface ChipsOrientationTransform {
    invert: Record<'y' | 'z', boolean>;
    offset: Record<'x' | 'y', number>;
    delta: Record<'x' | 'y', { col: number; row: number }>;
}

/**
 * @description Map of player orientations to chip transforms.
 */
export const chipOrientationTransform: Record<PlayerOrientation, ChipsOrientationTransform> = {
    bottom: {
        invert: { y: false, z: false },
        offset: { x: 35, y: 50 },
        delta: { x: { col: 62, row: 31 }, y: { col: 0, row: 15 } },
    },
    bottomLeft: {
        invert: { y: false, z: false },
        offset: { x: 35, y: 50 },
        delta: { x: { col: 40, row: 0 }, y: { col: 12, row: 22 } },
    },
    bottomRight: {
        invert: { y: true, z: false },
        offset: { x: 240, y: 50 },
        delta: { x: { col: 40, row: 0 }, y: { col: 12, row: 22 } },
    },
    left: {
        invert: { y: false, z: false },
        offset: { x: 35, y: 50 },
        delta: { x: { col: 0, row: -62 }, y: { col: 15, row: 5 } },
    },
    right: {
        invert: { y: true, z: false },
        offset: { x: 240, y: 50 },
        delta: { x: { col: 0, row: -62 }, y: { col: 15, row: 5 } },
    },
    top: {
        invert: { y: true, z: true },
        offset: { x: 240, y: 80 },
        delta: { x: { col: 62, row: 31 }, y: { col: 0, row: 15 } },
    },
    topLeft: {
        invert: { y: false, z: true },
        offset: { x: 50, y: 80 },
        delta: { x: { col: 40, row: 0 }, y: { col: 12, row: 22 } },
    },
    topRight: {
        invert: { y: true, z: true },
        offset: { x: 240, y: 80 },
        delta: { x: { col: 40, row: 0 }, y: { col: 12, row: 22 } },
    },
};
