import config from 'src/config';
import { Board } from 'src/types/tetris';

const { TETRIS_BOARD_ROWS, TETRIS_BOARD_CELLS } = config;
const TETRIS_CELLS_EDGED = TETRIS_BOARD_CELLS + 2;

export default function getFullRows(board: Board): number[] {
  const result = [];

  for (let row = 0; row < TETRIS_BOARD_ROWS; row += 1) {
    const rowStartIndex = TETRIS_CELLS_EDGED * row;
    const rowIndexes = board.slice(rowStartIndex, rowStartIndex + TETRIS_CELLS_EDGED);
    const isFull = rowIndexes.filter(Boolean).length === TETRIS_CELLS_EDGED;
    if (isFull) result.push(row);
  }

  return result;
}
