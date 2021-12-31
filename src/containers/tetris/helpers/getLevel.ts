import config from 'src/config';

const { TETRIS_ROWS_IN_LEVEL } = config;

export default function getLevel(initialLevel: number, cleared: number): number {
  return Math.floor(initialLevel + cleared / TETRIS_ROWS_IN_LEVEL);
}
