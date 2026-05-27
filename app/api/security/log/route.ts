import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getIp(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfIp = request.headers.get('cf-connecting-ip');

  if (forwarded) return forwarded.split(',')[0].trim();
  if (realIp) return realIp.trim();
  if (cfIp) return cfIp.trim();
  return 'unknown';
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRole) return null;

  return createClient(url, serviceRole, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as {
      eventType?: string;
      target?: string;
      detail?: string;
      projectSlug?: string;
      assetId?: string;
    };

    const ip = getIp(request);
    const userAgent = request.headers.get('user-agent') || 'unknown';

    const supabase = getSupabase();

    if (supabase) {
      await supabase.from('security_logs').insert({
        event_type: payload.eventType || 'unknown',
        target: payload.target || null,
        detail: payload.detail || null,
        project_slug: payload.projectSlug || null,
        asset_id: payload.assetId || null,
        ip_address: ip,
        user_agent: userAgent
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}