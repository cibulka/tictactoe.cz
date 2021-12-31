import path from 'path';

export default function getRootPath(filename: string): string {
  return path.join(path.join(process.cwd(), ''), filename);
}
