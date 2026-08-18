-- Production hardening for DotLinQ waitlist + analytics
-- Idempotent — safe to re-run

create extension if not exists pgcrypto;

create table if not exists public.waitlist_entries (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text not null,
  company text,
  role_title text,
  notes text,
  source text not null default 'landing',
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now(),
  constraint waitlist_entries_email_key unique (email)
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

-- Lock down: no direct anon/authenticated access.
-- All app traffic goes through Next.js API with SUPABASE_SECRET_KEY (bypasses RLS).
drop policy if exists "Allow public waitlist insert" on public.waitlist_entries;
drop policy if exists "Allow anon waitlist insert" on public.waitlist_entries;
drop policy if exists "Allow public landing event insert" on public.landing_events;
drop policy if exists "Allow anon landing event insert" on public.landing_events;

revoke all on table public.waitlist_entries from anon, authenticated, public;
revoke all on table public.landing_events from anon, authenticated, public;

grant usage on schema public to service_role;
grant all on table public.waitlist_entries to service_role, postgres;
grant all on table public.landing_events to service_role, postgres;

comment on table public.waitlist_entries is 'DotLinQ marketing waitlist — writes via server secret key only';
comment on table public.landing_events is 'DotLinQ landing analytics — writes via server secret key only';
