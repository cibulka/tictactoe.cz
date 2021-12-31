import { Cell, Side, WinnerCellIndexes } from './index';

export type MovePayload = {
  cells: Cell[];
};

export type MoveResponse = {
  isDraw: boolean;
  move: number | null;
  winner: Side | null;
  winnerCellIndexes: WinnerCellIndexes | null;
};

export type PayloadBestMove = (0 | 1 | 2)[];
