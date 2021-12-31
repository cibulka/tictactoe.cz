import config from 'src/config';
import getPaddedArray from 'src/helpers/getPaddedArray';
import getRandomValue from 'src/helpers/getRandomValue';
import getShuffledArray from 'src/helpers/getShuffledArray';
import { Board, EDGE_LEFT, EDGE_RIGHT } from 'src/types/tetris';

import getBlockTypeNew from './getBlockTypeNew';

const { TETRIS_BOARD_CELLS, TETRIS_BOARD_ROWS } = config;
const TETRIS_BOARD_CELLS_EDGED = TETRIS_BOARD_CELLS + 2;

function getRowBlock(): Board {
  const rowLength = getRandomValue([5, 6, 7, 8, 9]);
  const row = [...new Array(rowLength)].map(() => getBlockTypeNew().blockType);
  const rowPadded = getPaddedArray(row, 10, null) as Board;
  const rowShuffled = getShuffledArray(rowPadded) as Board;
  return [EDGE_LEFT, ...rowShuffled, EDGE_RIGHT];
}

function getRowEmpty(): Board {
  return [...new Array(TETRIS_BOARD_CELLS_EDGED)].map((_el, i) => {
    if (i === 0) return EDGE_LEFT;
    if (i === 11) return EDGE_RIGHT;
    return null;
  });
}

export default function getInitialBoard(rowBlocks: number): Board {
  let result: Board = [];
  for (let rowI = 0; rowI < TETRIS_BOARD_ROWS; rowI += 1) {
    const isRowBlocked = TETRIS_BOARD_ROWS - rowBlocks <= rowI;
    if (isRowBlocked) {
      result = result.concat(getRowBlock());
    } else {
      result = result.concat(getRowEmpty());
    }
  }

  return result;
}
