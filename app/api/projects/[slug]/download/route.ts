import { NextResponse } from 'next/server';
import { getProjectBySlug } from '@/lib/data';
import { isImageAsset } from '@/lib/utils';
import { renderWatermarkedBuffer } from '@/lib/watermark';
import { readAssetBuffer } from '@/lib/asset-source';

export const runtime = 'nodejs';

function getExtension(url: string) {
  const clean = url.split('?')[0].toLowerCase();
  if (clean.endsWith('.png')) return 'png' as const;
  if (clean.endsWith('.webp')) return 'webp' as const;
  return 'jpg' as const;
}

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  const targetUrl = project.asset_url || project.cover_url;

  if (!isImageAsset(targetUrl)) {
    return NextResponse.redirect(new URL(targetUrl, request.url), { status: 302 });
  }

  let input: Buffer;
  try {
    input = await readAssetBuffer(targetUrl);
  } catch {
    return NextResponse.json({ error: 'Asset unavailable' }, { status: 400 });
  }
  const ext = getExtension(targetUrl);
  const output = await renderWatermarkedBuffer(input, `${project.slug}-hafiz-al-fariz.${ext}`, ext);

  return new NextResponse(new Uint8Array(output), {
    headers: {
      'Content-Type': ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg',
      'Content-Disposition': `attachment; filename="${project.slug}-hafiz-al-fariz.${ext}"`,
      'Cache-Control': 'no-store'
    }
  });
}
