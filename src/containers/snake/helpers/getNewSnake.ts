export default function getNewSnake(snake: number[], nextHead: number, isDot: boolean) {
  const result = [...snake, nextHead];
  if (!isDot) result.shift();
  return result;
}
