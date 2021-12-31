export default function getScore(
  cleared: number,
  level: number,
  initialRows: number,
  initialLevel: number,
): number {
  const initialLevelModifier = initialLevel - 1;
  return cleared * (level + initialLevelModifier + initialRows);
}
