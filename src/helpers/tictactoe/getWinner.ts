import config from 'src/config';

import { Cell, Orientation, ORIENTATIONS, Side, WinnerCellIndexes } from 'src/types/tictactoe';

const { TIC_TAC_TOE_SIZE } = config;
const TIC_AREA = TIC_TAC_TOE_SIZE * TIC_TAC_TOE_SIZE;

function getStepForOrientation(orientation: Orientation): number {
  switch (orientation) {
    case 'x':
      return 1;
    case 'y':
      return TIC_TAC_TOE_SIZE;
    case '//':
      return TIC_TAC_TOE_SIZE - 1;
    case '\\':
      return TIC_TAC_TOE_SIZE + 1;
    default:
      throw new Error(`Unknown direction: ${orientation}.`);
  }
}

function isLeftEdge(index: number): boolean {
  return index % TIC_TAC_TOE_SIZE === 0;
}

function isRightEdge(index: number): boolean {
  return index + (1 % TIC_TAC_TOE_SIZE) === 0;
}

function isBreakingIndexForOrientation(
  index: number,
  order: number,
  orientation: Orientation,
): boolean {
  switch (orientation) {
    case 'x':
      if ([0, 4].includes(order)) return false;
      return isLeftEdge(index) || isRightEdge(index);
    case 'y': {
      return false;
    }
    case '//':
      if (order !== 4 && isLeftEdge(index)) return true;
      return false;
    case '\\': {
      if (order !== 0 && isLeftEdge(index)) return true;
      return false;
    }
    default:
      break;
  }
  throw new Error(`Unknown orientation: Orientation: ${orientation}.`);
}

function isInBounds(indexes: number[], orientation: Orientation): boolean {
  const breakingIndex = indexes
    .sort((a, b) => a - b)
    .find((index, order) => {
      if (index < 0 && index >= TIC_AREA) return true;
      return isBreakingIndexForOrientation(index, order, orientation);
    });
  return breakingIndex === undefined;
}

function getWinnerIndexesForOrientation(
  cells: Cell[],
  index: number,
  orientation: Orientation,
): WinnerCellIndexes | null {
  let result: WinnerCellIndexes | null = null;
  const cell = cells[index];
  const step = getStepForOrientation(orientation);

  ['asc', 'desc'].forEach((direction) => {
    if (result) return;
    const modifier = direction === 'desc' ? -1 : 1;
    const indexes = [...new Array(5)].map((_el, i) => index + i * step * modifier);
    if (!indexes.every((i) => cells[i] === cell)) return;
    if (!isInBounds(indexes, orientation)) return;
    result = indexes as WinnerCellIndexes;
  });

  return result;
}

function getWinnerIndexes(cells: Cell[]): WinnerCellIndexes | null {
  let result: WinnerCellIndexes | null = null;

  cells.forEach((cell, index) => {
    if (!cell) return;
    ORIENTATIONS.forEach((orientation) => {
      if (result) return;
      result = getWinnerIndexesForOrientation(cells, index, orientation);
    });
  });

  return result;
}

export default function getWinner(
  cells: Cell[],
): null | { winner: Side; winnerCellIndexes: WinnerCellIndexes } {
  const winnerCellIndexes = getWinnerIndexes(cells);

  let winner: Side | null = null;
  if (winnerCellIndexes && winnerCellIndexes.every((index) => cells[index] === 'cross')) {
    winner = 'cross';
  }
  if (winnerCellIndexes && winnerCellIndexes.every((index) => cells[index] === 'circle')) {
    winner = 'circle';
  }

  if (!winner || !winnerCellIndexes) return null;

  return {
    winner,
    winnerCellIndexes,
  };
}
