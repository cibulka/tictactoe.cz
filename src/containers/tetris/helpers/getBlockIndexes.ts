import config from 'src/config';
import {
  BlockType,
  initialBlockPositions,
  initialBlockPositionsForPreview,
} from 'src/types/tetris';

const { TETRIS_BOARD_CELLS } = config;
const TETRIS_CELLS_EDGED = TETRIS_BOARD_CELLS + 2;

export function getBlockIndexesForPreview(name: BlockType, rotate: number): number[] {
  return initialBlockPositionsForPreview[name][rotate] as number[];
}

export default function getBlockIndexes(name: BlockType, rotate = 0, x = 0, y = 0): number[] {
  const block = initialBlockPositions[name][rotate];
  return block.map((index) => index + x + y * TETRIS_CELLS_EDGED);
}
