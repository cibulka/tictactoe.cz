import config from 'src/config';
import { Direction } from 'src/types/snake';

const { SNAKE_BOARD_CELLS } = config;

export default function getNextSnakeHead(snake: number[], direction: Direction): number {
  const head = snake[snake.length - 1];

  switch (direction) {
    case 'top':
      return head - SNAKE_BOARD_CELLS;
    case 'right':
      return head + 1;
    case 'bottom':
      return head + SNAKE_BOARD_CELLS;
    case 'left':
      return head - 1;
    default:
      throw new Error(`Snake: Unknown direction ${direction}.`);
  }
}
