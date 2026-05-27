import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { renderWatermarkedBuffer } from '@/lib/watermark';

export const runtime = 'nodejs';

function getExtension(url: string) {
  const clean = url.split('?')[0].toLowerCase();
  if (clean.endsWith('.png')) return 'png' as const;
  if (clean.endsWith('.webp')) return 'webp' as const;
  return 'jpg' as const;
}

export async function GET(_: Request, { params }: { params: { assetId: string } }) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    return NextResponse.json({ error: 'Supabase env missing' }, { status: 500 });
  }

  const supabase = createClient(url, anon);
  const { data: asset, error } = await supabase
    .from('project_assets')
    .select('*')
    .eq('id', params.assetId)
    .single();

  const assetUrl = asset?.file_url || asset?.image_url;
  if (error || !assetUrl) {
    return NextResponse.json({ error: 'Asset not found' }, { status: 404 });
  }

  const response = await fetch(assetUrl, { cache: 'no-store' });
  if (!response.ok) {
    return NextResponse.json({ error: 'Image unavailable' }, { status: 400 });
  }

  const input = Buffer.from(await response.arrayBuffer());
  const ext = getExtension(assetUrl);
  const output = await renderWatermarkedBuffer(input, `hafiz-al-fariz-asset-${params.assetId}.${ext}`, ext);

  return new NextResponse(new Uint8Array(output), {
    headers: {
      'Content-Type': ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg',
      'Content-Disposition': `attachment; filename="hafiz-al-fariz-asset.${ext}"`,
      'Cache-Control': 'no-store'
    }
  });
}
