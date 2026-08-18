import { NextRequest, NextResponse } from 'next/server';
import {
  AUBAIR_ADMIN_COOKIE,
  createAubairAdminToken,
  getAubairAdminCredentials,
} from '@/lib/admin-auth';

export const runtime = 'nodejs';

const recent = new Map<string, number[]>();

function clientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const max = 12;
  const stamps = (recent.get(ip) ?? []).filter((t) => now - t < windowMs);
  if (stamps.length >= max) {
    recent.set(ip, stamps);
    return true;
  }
  stamps.push(now);
  recent.set(ip, stamps);
  return false;
}

export async function POST(request: NextRequest) {
  const ip = clientIp(request);
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again in a few minutes.' },
      { status: 429 }
    );
  }

  const creds = getAubairAdminCredentials();
  if (!creds) {
    return NextResponse.json(
      { error: 'AUBAIR_ADMIN_PASSWORD is not configured on this server.' },
      { status: 503 }
    );
  }

  let body: { username?: string; password?: string };
  try {
    body = (await request.json()) as { username?: string; password?: string };
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const username = typeof body.username === 'string' ? body.username.trim() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (username !== creds.username || password !== creds.password) {
    return NextResponse.json({ error: 'Incorrect username or password.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(
    AUBAIR_ADMIN_COOKIE,
    createAubairAdminToken(creds.username, creds.password),
    {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 14,
    }
  );
  return response;
}
