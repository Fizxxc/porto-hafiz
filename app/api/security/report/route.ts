import { NextResponse } from 'next/server';
import { getRequestIp, sanitizeUserAgent } from '@/lib/security';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      eventType?: string;
      projectSlug?: string;
      metadata?: Record<string, unknown>;
    };

    const supabase = createClient();

    await (supabase.from('security_events') as any).insert({
      event_type: body.eventType || 'unknown',
      project_slug: body.projectSlug || null,
      ip_address: getRequestIp(request),
      user_agent: request.headers.get('user-agent') || '',
      metadata: body.metadata || {}
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
