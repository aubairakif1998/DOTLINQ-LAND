import { createServiceClient } from '@/utils/supabase/service';
import type {
  AnalyticsSummary,
  JoinWaitlistInput,
  JoinWaitlistResult,
  LandingEventInput,
  LandingEventType,
  WaitlistEntry,
} from './waitlist-types';

export type {
  AnalyticsSummary,
  JoinWaitlistInput,
  JoinWaitlistResult,
  LandingEventInput,
  LandingEventType,
  WaitlistEntry,
} from './waitlist-types';

type WaitlistRow = {
  id: string;
  email: string;
  name: string;
  company: string | null;
  role_title: string | null;
  notes: string | null;
  source: string;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
};

function nullIfBlank(value?: string | null): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function truncate(value: string | undefined, max: number): string | null {
  const trimmed = nullIfBlank(value);
  if (!trimmed) return null;
  return trimmed.length <= max ? trimmed : trimmed.slice(0, max);
}

function mapWaitlistRow(row: WaitlistRow): WaitlistEntry {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    company: row.company,
    roleTitle: row.role_title,
    notes: row.notes,
    source: row.source,
    ipAddress: row.ip_address,
    userAgent: row.user_agent,
    createdAt: row.created_at,
  };
}

function isUniqueViolation(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  if (error.code === '23505') return true;
  return (error.message ?? '').toLowerCase().includes('duplicate');
}

export async function joinWaitlist(input: JoinWaitlistInput): Promise<JoinWaitlistResult> {
  // Honeypot: pretend success so bots don't retry.
  if (input.website?.trim()) {
    return {
      alreadyJoined: false,
      message: "You're on the list. We'll be in touch soon.",
    };
  }

  const email = input.email.trim().toLowerCase();
  const name = input.name.trim();
  // Server API uses secret key — publishable/anon RLS insert is blocked on this project.
  const supabase = createServiceClient();

  const { error } = await supabase.from('waitlist_entries').insert({
    email,
    name,
    company: truncate(input.company, 200),
    role_title: truncate(input.roleTitle, 120),
    notes: truncate(input.notes, 2000),
    source: truncate(input.source, 64) || 'landing',
    ip_address: truncate(input.ipAddress, 64),
    user_agent: truncate(input.userAgent, 512),
  });

  if (error) {
    if (isUniqueViolation(error)) {
      return {
        alreadyJoined: true,
        message:
          "You're already on the DotLinQ waitlist. We'll reach out when access opens.",
      };
    }
    console.error('[waitlist] insert failed', error);
    throw new Error(error.message || 'Unable to join waitlist right now.');
  }

  return {
    alreadyJoined: false,
    message: "You're on the list. We'll be in touch when DotLinQ opens.",
  };
}

export async function listWaitlist(): Promise<WaitlistEntry[]> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('waitlist_entries')
    .select(
      'id, email, name, company, role_title, notes, source, ip_address, user_agent, created_at'
    )
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[waitlist] list failed', error);
    throw new Error(
      error.message.includes('permission') || error.code === '42501'
        ? 'Waitlist admin reads require SUPABASE_SECRET_KEY (service role) in env.'
        : error.message
    );
  }

  return ((data ?? []) as WaitlistRow[]).map(mapWaitlistRow);
}

const EVENT_TYPES = new Set<LandingEventType>([
  'page_view',
  'waitlist_open',
  'waitlist_submit',
]);

export async function trackLandingEvent(input: LandingEventInput): Promise<void> {
  if (!EVENT_TYPES.has(input.eventType)) return;
  if (!input.sessionId.trim()) return;

  const supabase = createServiceClient();
  const { error } = await supabase.from('landing_events').insert({
    session_id: truncate(input.sessionId, 80),
    event_type: input.eventType,
    path: truncate(input.path, 200),
    referrer: truncate(input.referrer, 500),
    utm_source: truncate(input.utmSource, 120),
    utm_medium: truncate(input.utmMedium, 120),
    utm_campaign: truncate(input.utmCampaign, 120),
    landing_url: truncate(input.landingUrl, 500),
  });

  if (error) {
    console.error('[analytics] insert failed', error);
  }
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const supabase = createServiceClient();
  const now = Date.now();
  const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString();
  const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString();

  const [
    { count: waitlistSignups, error: signupsError },
    { count: pageViews, error: pageViewsError },
    { count: waitlistOpens, error: opensError },
    { count: waitlistSubmitsTracked, error: submitsError },
    { data: sessionRows, error: sessionsError },
    { count: signupsLast7Days, error: last7Error },
    { count: signupsLast30Days, error: last30Error },
  ] = await Promise.all([
    supabase.from('waitlist_entries').select('*', { count: 'exact', head: true }),
    supabase
      .from('landing_events')
      .select('*', { count: 'exact', head: true })
      .eq('event_type', 'page_view'),
    supabase
      .from('landing_events')
      .select('*', { count: 'exact', head: true })
      .eq('event_type', 'waitlist_open'),
    supabase
      .from('landing_events')
      .select('*', { count: 'exact', head: true })
      .eq('event_type', 'waitlist_submit'),
    supabase.from('landing_events').select('session_id'),
    supabase
      .from('waitlist_entries')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', sevenDaysAgo),
    supabase
      .from('waitlist_entries')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', thirtyDaysAgo),
  ]);

  const firstError =
    signupsError ||
    pageViewsError ||
    opensError ||
    submitsError ||
    sessionsError ||
    last7Error ||
    last30Error;
  if (firstError) {
    console.error('[analytics] summary failed', firstError);
    throw new Error(
      firstError.message.includes('permission') || firstError.code === '42501'
        ? 'Analytics require SUPABASE_SECRET_KEY (service role) in env.'
        : firstError.message
    );
  }

  const uniqueSessions = new Set(
    (sessionRows ?? []).map((row) => String((row as { session_id: string }).session_id))
  ).size;

  return {
    waitlistSignups: waitlistSignups ?? 0,
    pageViews: pageViews ?? 0,
    waitlistOpens: waitlistOpens ?? 0,
    waitlistSubmitsTracked: waitlistSubmitsTracked ?? 0,
    uniqueSessions,
    signupsLast7Days: signupsLast7Days ?? 0,
    signupsLast30Days: signupsLast30Days ?? 0,
  };
}

export function toCsv(entries: WaitlistEntry[]): string {
  const header = ['Name', 'Email', 'Company', 'Role', 'Notes', 'Source', 'Created at'];
  const rows = entries.map((entry) =>
    [
      entry.name,
      entry.email,
      entry.company ?? '',
      entry.roleTitle ?? '',
      entry.notes ?? '',
      entry.source,
      entry.createdAt,
    ].map(csvCell)
  );

  return [header.join(','), ...rows.map((row) => row.join(','))].join('\n');
}

function csvCell(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
