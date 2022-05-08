export const mainColors = ['primary', 'secondary', 'success', 'warning', 'error'] as const;

export type MainColor = typeof mainColors[number];

export const backgroundColors = [...mainColors, 'background', 'shaded', 'tinted'] as const;

export type BackgroundColor = typeof backgroundColors[number];
