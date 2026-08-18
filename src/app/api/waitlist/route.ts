import { NextRequest, NextResponse } from 'next/server';
import { joinWaitlist } from '@/lib/waitlist';

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
  const windowMs = 10 * 60 * 1000;
  const max = 8;
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
      { error: 'Too many attempts. Please try again in a few minutes.' },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  let name = typeof body.name === 'string' ? body.name.trim() : '';

  if (!email || !EMAIL_RE.test(email) || email.length > 320) {
    return NextResponse.json({ error: 'A valid work email is required.' }, { status: 400 });
  }

  if (!name) {
    const local = email.split('@')[0] || 'Operator';
    name = local
      .replace(/[._+-]+/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .slice(0, 80);
  }
  if (name.length > 200) {
    return NextResponse.json({ error: 'Name is too long.' }, { status: 400 });
  }

  try {
    const result = await joinWaitlist({
      email,
      name,
      company: typeof body.company === 'string' ? body.company : undefined,
      roleTitle: typeof body.roleTitle === 'string' ? body.roleTitle : undefined,
      notes: typeof body.notes === 'string' ? body.notes : undefined,
      source: typeof body.source === 'string' ? body.source : 'landing',
      website: typeof body.website === 'string' ? body.website : '',
      ipAddress: ip,
      userAgent: request.headers.get('user-agent') ?? undefined,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('[api/waitlist]', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unable to join waitlist.',
      },
      { status: 500 }
    );
  }
}
