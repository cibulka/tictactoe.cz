export const SIDE_CIRCLE = 'circle';

export const SIDE_CROSS = 'cross';

export const ORIENTATIONS = ['x', 'y', '//', '\\'] as const;

export type Cell = Side | null;

export type Orientation = typeof ORIENTATIONS[number];

export type Side = typeof SIDE_CROSS | typeof SIDE_CIRCLE;

export type WinnerCellIndexes = [number, number, number, number, number];
