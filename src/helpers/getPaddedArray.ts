export default function getPaddedArray(arr: unknown[], pad: number, value: unknown): unknown[] {
  const padUsed = pad - arr.length;
  return [...arr, ...new Array(padUsed).map(() => value)];
}
