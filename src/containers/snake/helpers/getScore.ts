export default function getScore(dots: number, speedLevel: number): number {
  return dots * (speedLevel + 1);
}
