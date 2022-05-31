import { mainColors } from '@poker-moons/styles';

export const variants = ['primary', 'secondary'] as const;

export type ButtonVariant = typeof variants[number];

export const buttonColors = mainColors;

export type ButtonColors = typeof buttonColors[number];
