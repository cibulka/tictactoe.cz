import config from 'src/config';
import { Cell } from 'src/types/tictactoe';

const { TIC_TAC_TOE_SIZE, TIC_TAC_TOE_SHOWN } = config;
const TIC_TAC_TOE_AREA = TIC_TAC_TOE_SIZE * TIC_TAC_TOE_SIZE;

function indexToCoordinates(
  index: number,
  boardMaxSize = TIC_TAC_TOE_SIZE,
): [x: number, y: number] {
  const start = Math.floor(boardMaxSize / 2);
  const x = (index % boardMaxSize) - start;
  const y = Math.floor(index / boardMaxSize) - start;
  return [x, y];
}

export default function getMinSize(cells: Cell[]): number {
  const occupiedIndexes: number[] = [];
  cells.forEach((cell, i) => {
    if (cell !== null) occupiedIndexes.push(i);
  });

  return occupiedIndexes.reduce((prev: number, curr: number) => {
    const [x, y] = indexToCoordinates(curr);
    const xMinSize = Math.abs(x) * 2 + 1;
    const yMinSize = Math.abs(y) * 2 + 1;
    return Math.max(xMinSize, yMinSize, prev);
  }, TIC_TAC_TOE_SHOWN);
}
