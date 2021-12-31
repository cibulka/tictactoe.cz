import config from 'src/config';

const { TIC_TAC_TOE_SIZE } = config;
const TIC_TAC_TOE_AREA = TIC_TAC_TOE_SIZE * TIC_TAC_TOE_SIZE;
const TIC_TAC_TOE_CENTER = (TIC_TAC_TOE_AREA - 1) / 2;

export default function getShownIndexes(shown: number): number[] {
  const shownHalf = Math.floor(shown / 2);
  const firstShownIndex = TIC_TAC_TOE_CENTER - shownHalf - TIC_TAC_TOE_SIZE * shownHalf;

  let result: number[] = [];
  for (let i = 0; i < shown; i += 1) {
    const rowStart = firstShownIndex + i * TIC_TAC_TOE_SIZE;
    const cells = [...new Array(shown)].map((_el, cellI) => rowStart + cellI);
    result = result.concat(cells);
  }
  return result;
}
