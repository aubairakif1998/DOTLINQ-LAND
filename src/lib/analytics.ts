export type LandingEventType = 'page_view' | 'waitlist_open' | 'waitlist_submit';

const SESSION_KEY = 'dotlinq_landing_session';
const PAGE_VIEW_KEY = 'dotlinq_page_view_sent';

function readUtm(param: string): string | undefined {
  try {
    const value = new URLSearchParams(window.location.search).get(param);
    return value?.trim() || undefined;
  } catch {
    return undefined;
  }
}

export function getLandingSessionId(): string {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `s_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    return `s_${Date.now()}`;
  }
}

export async function trackLandingEvent(eventType: LandingEventType): Promise<void> {
  if (typeof window === 'undefined') return;

  if (eventType === 'page_view') {
    try {
      if (sessionStorage.getItem(PAGE_VIEW_KEY) === '1') return;
      sessionStorage.setItem(PAGE_VIEW_KEY, '1');
    } catch {
      /* ignore */
    }
  }

  const payload = {
    sessionId: getLandingSessionId(),
    eventType,
    path: window.location.pathname || '/',
    referrer: document.referrer || undefined,
    utmSource: readUtm('utm_source'),
    utmMedium: readUtm('utm_medium'),
    utmCampaign: readUtm('utm_campaign'),
    landingUrl: window.location.href,
  };

  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'omit',
      keepalive: true,
      body: JSON.stringify(payload),
    });
  } catch {
    // Analytics must never break the marketing page.
  }
}
