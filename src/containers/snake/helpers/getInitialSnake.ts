import config from 'src/config';

const { SNAKE_INITIAL_SIZE, SNAKE_BOARD_CELLS, SNAKE_BOARD_ROWS, SNAKE_SPEED } = config;
const SNAKE_BOARD_AREA = SNAKE_BOARD_CELLS * SNAKE_BOARD_ROWS;
const SNAKE_CENTER = Math.floor(SNAKE_BOARD_AREA / 2);
const SNAKE_HALF_SIZE = Math.floor(SNAKE_INITIAL_SIZE / 2);

export default function getInitialSnake(): number[] {
  const result = [];

  const start = SNAKE_CENTER - SNAKE_HALF_SIZE;

  for (let i = 0; i < SNAKE_INITIAL_SIZE; i += 1) {
    result.push(start + i);
  }

  return result;
}
