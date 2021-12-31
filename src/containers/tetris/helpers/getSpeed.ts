import config from 'src/config';

const { TETRIS_SPEED_INITIAL, TETRIS_SPEED_LEVEL_INCREASE } = config;

export default function getSpeed(level: number): number {
  return TETRIS_SPEED_INITIAL - level * TETRIS_SPEED_LEVEL_INCREASE;
}
