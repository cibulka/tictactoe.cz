import { Board, EDGE_LEFT, EDGE_RIGHT } from 'src/types/tetris';
import getBlockIndexes from './getBlockIndexes';

export default function isLegalBlock(block: number[], board: Board): boolean {
  // Collisions
  const illegalIndex = block.find((index) => {
    // bottom
    if (index >= board.length) return true;
    // occupied
    if (board[index]) return true;
    return false;
  });

  return illegalIndex === undefined;
}

export function getBlockRotateModifier(block: number[], board: Board): number | undefined {
  const isLeftEdge = block.find((i) => board[i] === EDGE_LEFT) !== undefined;
  const isRightEdge = block.find((i) => board[i] === EDGE_RIGHT) !== undefined;
  const modifiers = isLeftEdge ? [1, 2] : isRightEdge ? [-1, -2] : null;

  if (!modifiers) return undefined;

  return modifiers.find((m) =>
    isLegalBlock(
      block.map((b) => b + m),
      board,
    ),
  );
}
