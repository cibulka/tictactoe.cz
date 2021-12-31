import config from 'src/config';
import { Board } from 'src/types/tetris';

import getInitialBoard from './getInitialBoard';

const { TETRIS_BOARD_CELLS, TETRIS_BOARD_ROWS } = config;
const TETRIS_CELLS_EDGED = TETRIS_BOARD_CELLS + 2;

export default function clearRows(board: Board, fullRows: number[]): Board {
  const result: Board = getInitialBoard(0);

  for (let rowIndex = TETRIS_BOARD_ROWS - 1, rowsToClear = 0; rowIndex >= 0; rowIndex -= 1) {
    if (!fullRows.includes(rowIndex)) {
      const startIndex = rowIndex * TETRIS_CELLS_EDGED;
      const row = board.slice(startIndex, startIndex + TETRIS_CELLS_EDGED);
      const newStartIndex = (rowIndex + rowsToClear) * TETRIS_CELLS_EDGED;

      result.splice(newStartIndex, TETRIS_CELLS_EDGED, ...row);
    } else {
      rowsToClear += 1;
    }
  }

  return result;
}
