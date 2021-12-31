import config from 'src/config';
import { Cell } from 'src/types/tictactoe';

const { TIC_TAC_TOE_SIZE } = config;
const TIC_TAC_TOE_AREA = TIC_TAC_TOE_SIZE * TIC_TAC_TOE_SIZE;

export default function getInitialBoard(): Cell[] {
  return [...Array(TIC_TAC_TOE_AREA)].map(() => null);
}
