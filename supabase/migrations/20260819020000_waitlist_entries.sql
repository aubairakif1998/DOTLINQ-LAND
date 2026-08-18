-- DotLinQ Landing Page — Waitlist + analytics schema
-- Run this in Supabase Dashboard → SQL Editor → New query → Run

-- Waitlist signups
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

create index if not exists idx_waitlist_entries_created_at
  on public.waitlist_entries (created_at desc);

-- Landing analytics events
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

create index if not exists idx_landing_events_type
  on public.landing_events (event_type);

create index if not exists idx_landing_events_session
  on public.landing_events (session_id);

create index if not exists idx_landing_events_created_at
  on public.landing_events (created_at desc);

-- RLS
alter table public.waitlist_entries enable row level security;
alter table public.landing_events enable row level security;

-- Public can join waitlist (anon / publishable key)
drop policy if exists "Allow public waitlist insert" on public.waitlist_entries;
create policy "Allow public waitlist insert"
  on public.waitlist_entries
  for insert
  to anon, authenticated
  with check (true);

-- Public can write analytics events
drop policy if exists "Allow public landing event insert" on public.landing_events;
create policy "Allow public landing event insert"
  on public.landing_events
  for insert
  to anon, authenticated
  with check (true);

-- No public SELECT — use SUPABASE_SECRET_KEY / service role in admin API
-- (service role bypasses RLS automatically)

comment on table public.waitlist_entries is 'DotLinQ marketing waitlist signups';
comment on table public.landing_events is 'DotLinQ landing page analytics events';

-- Privileges (required for roles to use the tables)
grant usage on schema public to anon, authenticated, service_role;
grant insert on table public.waitlist_entries to anon, authenticated;
grant insert on table public.landing_events to anon, authenticated;
grant all on table public.waitlist_entries to service_role;
grant all on table public.landing_events to service_role;
