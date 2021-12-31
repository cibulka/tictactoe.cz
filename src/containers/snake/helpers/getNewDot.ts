import config from 'src/config';
import getRandomValue from 'src/helpers/getRandomValue';

const { SNAKE_BOARD_CELLS, SNAKE_BOARD_ROWS } = config;
const SNAKE_BOARD_AREA = SNAKE_BOARD_CELLS * SNAKE_BOARD_ROWS;

export default function getNewDot(snake: number[]): number | false {
  const availableDots = [...new Array(SNAKE_BOARD_AREA)]
    .map((_el, i) => i)
    .filter((i) => !snake.includes(i));
  return availableDots.length === 0 ? false : (getRandomValue(availableDots) as number);
}
