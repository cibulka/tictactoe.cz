export default function getRandomValue(arr: unknown[]): unknown {
  return arr[Math.floor(Math.random() * arr.length)];
}
