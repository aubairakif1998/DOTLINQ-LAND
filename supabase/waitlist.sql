-- DotLinQ Landing Page — waitlist + analytics (canonical schema)
-- Prefer: npm run db:migrate
-- Or paste into Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.waitlist_entries (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text not null,
  company text,
  role_title text,
  notes text,
  source text not null default 'landing',
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now()
);

create table if not exists public.landing_events (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  event_type text not null,
  path text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  landing_url text,
  created_at timestamptz not null default now()
);

create index if not exists idx_waitlist_entries_created_at
  on public.waitlist_entries (created_at desc);

create index if not exists idx_waitlist_entries_email_lower
  on public.waitlist_entries (lower(email));

create index if not exists idx_landing_events_type
  on public.landing_events (event_type);

create index if not exists idx_landing_events_session
  on public.landing_events (session_id);

create index if not exists idx_landing_events_created_at
  on public.landing_events (created_at desc);

alter table public.waitlist_entries enable row level security;
alter table public.landing_events enable row level security;

-- Locked down: Next.js API uses SUPABASE_SECRET_KEY (bypasses RLS).
revoke all on table public.waitlist_entries from anon, authenticated, public;
revoke all on table public.landing_events from anon, authenticated, public;
grant usage on schema public to service_role;
grant all on table public.waitlist_entries to service_role, postgres;
grant all on table public.landing_events to service_role, postgres;

comment on table public.waitlist_entries is 'DotLinQ marketing waitlist — server secret key only';
comment on table public.landing_events is 'DotLinQ landing analytics — server secret key only';
