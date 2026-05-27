import type { NextRequest } from 'next/server';

export function getRequestIp(request: Request | NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';

  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp;

  return 'unknown';
}

export function sanitizeUserAgent(value: string | null) {
  if (!value) return 'unknown';
  return value.slice(0, 500);
}
