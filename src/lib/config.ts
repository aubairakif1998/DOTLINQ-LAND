export type JoinWaitlistPayload = {
  email: string;
  name: string;
  company?: string;
  roleTitle?: string;
  notes?: string;
  source?: string;
  website?: string;
};

export type JoinWaitlistResult = {
  alreadyJoined: boolean;
  message: string;
};

export async function joinWaitlist(payload: JoinWaitlistPayload): Promise<JoinWaitlistResult> {
  const res = await fetch('/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify({
      email: payload.email,
      name: payload.name,
      company: payload.company || undefined,
      roleTitle: payload.roleTitle || undefined,
      notes: payload.notes || undefined,
      source: payload.source || 'landing',
      website: payload.website || '',
    }),
  });

  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    /* ignore parse errors */
  }

  const data = body as JoinWaitlistResult & { error?: string };
  if (res.ok && data?.message) {
    return {
      alreadyJoined: Boolean(data.alreadyJoined),
      message: data.message,
    };
  }

  throw new Error(
    data?.error ||
      (res.status >= 500
        ? 'Something went wrong on our side. Please try again shortly.'
        : 'Unable to join the waitlist. Please check your details and try again.')
  );
}
