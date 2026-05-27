import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function GET(request: NextRequest) {
  const value = request.nextUrl.searchParams.get('value') || 'https://saweria.co/Fizzx';

  const svg = await QRCode.toString(value, {
    type: 'svg',
    margin: 1,
    width: 180,
    color: {
      dark: '#FFFFFF',
      light: '#00000000'
    }
  });

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}