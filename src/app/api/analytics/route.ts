import { NextRequest, NextResponse } from 'next/server';
import { trackLandingEvent, type LandingEventType } from '@/lib/waitlist';

export const runtime = 'nodejs';

const EVENT_TYPES = new Set<LandingEventType>([
  'page_view',
  'waitlist_open',
  'waitlist_submit',
]);

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const eventType = body.eventType;
    const sessionId = typeof body.sessionId === 'string' ? body.sessionId : '';

    if (typeof eventType !== 'string' || !EVENT_TYPES.has(eventType as LandingEventType)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    if (!sessionId) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    await trackLandingEvent({
      sessionId,
      eventType: eventType as LandingEventType,
      path: typeof body.path === 'string' ? body.path : undefined,
      referrer: typeof body.referrer === 'string' ? body.referrer : undefined,
      utmSource: typeof body.utmSource === 'string' ? body.utmSource : undefined,
      utmMedium: typeof body.utmMedium === 'string' ? body.utmMedium : undefined,
      utmCampaign: typeof body.utmCampaign === 'string' ? body.utmCampaign : undefined,
      landingUrl: typeof body.landingUrl === 'string' ? body.landingUrl : undefined,
    });
  } catch {
    // Analytics must never fail the page.
  }

  return NextResponse.json({ ok: true });
}
