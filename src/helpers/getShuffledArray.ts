/**
 * @link https://stackoverflow.com/a/46545530/1872494
 */
export default function getShuffledArray(arr: unknown[]): unknown[] {
  const result = [...arr];
  return result
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
