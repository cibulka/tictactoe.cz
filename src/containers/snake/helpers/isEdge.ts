import config from 'src/config';
import { Direction } from 'src/types/snake';

const { SNAKE_BOARD_CELLS, SNAKE_BOARD_ROWS } = config;
const SNAKE_BOARD_AREA = SNAKE_BOARD_CELLS * SNAKE_BOARD_ROWS;

export default function isEdge(index: number, direction: Direction): boolean {
  switch (direction) {
    case 'top':
      return index < 0;
    case 'right':
      return index % SNAKE_BOARD_CELLS === 0;
    case 'bottom':
      return index >= SNAKE_BOARD_AREA;
    case 'left':
      return (index + 1) % SNAKE_BOARD_CELLS === 0;
    default:
      throw new Error(`Snake: Unknown direction ${direction}.`);
  }
}
