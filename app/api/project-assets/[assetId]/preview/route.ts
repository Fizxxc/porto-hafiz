import { NextResponse } from 'next/server';
import QRCode from 'qrcode';
import sharp from 'sharp';
import { createClient } from '@supabase/supabase-js';

function getExt(url: string) {
  const clean = url.split('?')[0].toLowerCase();
  if (clean.endsWith('.png')) return 'png';
  if (clean.endsWith('.webp')) return 'webp';
  return 'jpg';
}

export async function GET(
  _: Request,
  { params }: { params: { assetId: string } }
) {
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
  const image = sharp(input);
  const meta = await image.metadata();

  const width = meta.width ?? 1600;
  const height = meta.height ?? 1200;

  const qrSize = Math.max(110, Math.round(width * 0.12));
  const qrBuffer = await QRCode.toBuffer('https://saweria.co/Fizzx', {
    type: 'png',
    width: qrSize,
    margin: 1,
    color: {
      dark: '#FFFFFFBB',
      light: '#00000000'
    }
  });

  const watermarkSvg = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .wm {
          fill: rgba(255,255,255,0.15);
          font-size: ${Math.max(26, Math.round(width * 0.045))}px;
          font-family: Arial, Helvetica, sans-serif;
          letter-spacing: 4px;
          font-weight: 700;
        }
        .sub {
          fill: rgba(255,255,255,0.11);
          font-size: ${Math.max(12, Math.round(width * 0.014))}px;
          font-family: Arial, Helvetica, sans-serif;
          letter-spacing: 2px;
        }
      </style>

      <g transform="translate(${width / 2}, ${height / 2}) rotate(-24)">
        <text x="0" y="0" text-anchor="middle" class="wm">HAFIZ AL FARIZ • PREVIEW ONLY</text>
      </g>

      <text x="${width - 34}" y="${height - 32}" text-anchor="end" class="sub">Support developer · Saweria QR</text>
    </svg>
  `);

  const output = await image
    .composite([
      { input: watermarkSvg, gravity: 'center' },
      {
        input: qrBuffer,
        left: width - qrSize - 28,
        top: height - qrSize - 54
      }
    ])
    .jpeg({ quality: 92 })
    .toBuffer();

  return new NextResponse(new Uint8Array(output), {
    headers: {
      'Content-Type': 'image/jpeg',
      'Content-Disposition': 'inline; filename="preview.jpg"',
      'Cache-Control': 'private, no-store, max-age=0'
    }
  });
}