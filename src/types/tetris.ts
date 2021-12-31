export const initialBlockPositions = {
  I: [
    [4, 5, 6, 7],
    [5, 17, 29, 41],
  ],
  J: [
    [4, 16, 17, 18],
    [5, 6, 17, 29],
    [4, 5, 6, 18],
    [5, 17, 28, 29],
  ],
  L: [
    [6, 16, 17, 18],
    [5, 17, 29, 30],
    [5, 6, 7, 17],
    [5, 6, 18, 30],
  ],
  O: [[5, 6, 17, 18]],
  S: [
    [6, 7, 17, 18],
    [5, 17, 18, 30],
  ],
  T: [
    [5, 16, 17, 18],
    [5, 17, 18, 29],
    [4, 5, 6, 17],
    [5, 16, 17, 29],
  ],
  Z: [
    [5, 6, 18, 19],
    [6, 17, 18, 29],
  ],
};

export const initialBlockPositionsForPreview = {
  I: [[4, 5, 6, 7]],
  J: [[0, 4, 5, 6], null, [0, 1, 2, 6], null],
  L: [[2, 4, 5, 6], null, [0, 1, 2, 4], null],
  O: [[0, 1, 4, 5]],
  S: [[1, 2, 4, 5]],
  T: [[1, 4, 5, 6], null, [0, 1, 2, 5], null],
  Z: [[0, 1, 5, 6]],
};

export const BLOCK_TYPES = <const>['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

export const EDGE_LEFT = 'EDGE_LEFT';
export const EDGE_RIGHT = 'EDGE_RIGHT';

export type BlockType = typeof BLOCK_TYPES[number];

export type Board = (BlockType | typeof EDGE_LEFT | typeof EDGE_RIGHT | null)[];
