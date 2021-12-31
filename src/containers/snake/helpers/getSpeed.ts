import config from 'src/config';
import { GameSpeedLevel } from 'src/types/snake';

const { SNAKE_SPEED } = config;

export default function getSpeed(speedLevel: GameSpeedLevel): number {
  return SNAKE_SPEED - speedLevel * 50;
}
