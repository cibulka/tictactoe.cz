import { NextApiRequest, NextApiResponse } from 'next';

import getWinner from 'src/helpers/tictactoe/getWinner';
import getBestMove from 'src/containers/tictactoe-singleplayer/helpers/getBestMove';
import { createAppError } from 'src/helpers/error';
import { Cell } from 'src/types/tictactoe';
import { MovePayload, MoveResponse, PayloadBestMove } from 'src/types/tictactoe/singleplayer';

export default async function move(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const payload: MovePayload = req.body;
    const { cells } = payload;

    const result: MoveResponse = {
      isDraw: false,
      move: null,
      winner: null,
      winnerCellIndexes: null,
    };

    // Player has won
    const winner = getWinner(cells);
    if (winner) {
      result.winner = winner.winner;
      result.winnerCellIndexes = winner.winnerCellIndexes;
      res.status(200).send(result);
      return;
    }

    // Draw
    const emptyCells = cells.filter((c) => c === null);
    const isDraw = emptyCells.length === 0;
    if (isDraw) {
      result.isDraw = true;
      res.status(200).send(result);
      return;
    }

    // Move
    const cellsForBestMove: PayloadBestMove = cells.map((cell) => {
      switch (cell) {
        case 'cross':
          return 2;
        case 'circle':
          return 1;
        default:
          return 0;
      }
    });
    const move = getBestMove(cellsForBestMove);
    if (move === undefined) {
      // eslint-disable-next-line no-console
      console.error('Could not find move.', cells);
      throw new Error('Could not find move.');
    }
    result.move = move;

    // Robot won
    const cellsAfterRobotMoved: Cell[] = [
      ...cells.slice(0, move),
      'circle',
      ...cells.slice(move + 1),
    ];
    const winnerRobot = getWinner(cellsAfterRobotMoved);
    if (winnerRobot) {
      result.winner = winnerRobot.winner;
      result.winnerCellIndexes = winnerRobot.winnerCellIndexes;
      res.status(200).send(result);
      return;
    }

    // Nobody won, just send the response
    res.status(200).send(result);
  } catch (error) {
    const appError = createAppError((error as Error)?.message);
    res.status(appError.status || 500).send(appError);
  }
}
