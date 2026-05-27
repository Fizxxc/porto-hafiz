import { readFile } from 'node:fs/promises';
import path from 'node:path';

export async function readAssetBuffer(targetUrl: string) {
  if (targetUrl.startsWith('/')) {
    const safePath = path.join(process.cwd(), 'public', targetUrl.replace(/^\//, ''));
    return readFile(safePath);
  }

  const response = await fetch(targetUrl, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Asset unavailable');
  }
  return Buffer.from(await response.arrayBuffer());
}
