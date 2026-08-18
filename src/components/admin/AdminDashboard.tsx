'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download, LogOut, Search, Users } from 'lucide-react';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { AnalyticsSummary, WaitlistEntry } from '@/lib/waitlist-types';

type AdminDashboardProps = {
  entries: WaitlistEntry[];
  stats: AnalyticsSummary;
  logoutApi?: string;
  loginPath?: string;
  csvPath?: string;
  title?: string;
};

export function AdminDashboard({
  entries,
  stats,
  logoutApi = '/api/aubairadmin/logout',
  loginPath = '/aubairadmin',
  csvPath = '/api/aubairadmin/waitlist?format=csv',
  title = 'Waitlist insights',
}: AdminDashboardProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter((entry) =>
      [entry.name, entry.email, entry.company, entry.roleTitle, entry.notes]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q))
    );
  }, [entries, query]);

  const logout = async () => {
    await fetch(logoutApi, { method: 'POST' });
    router.replace(loginPath);
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <header className="border-b border-[#0B1220]/8 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-4">
            <BrandLogo size="sm" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#38b6ff]">
                Marketing
              </p>
              <h1 className="text-sm font-semibold text-[#0B1220]">{title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" className="h-9 rounded-xl">
              <a href={csvPath}>
                <Download className="size-4" />
                Export CSV
              </a>
            </Button>
            <Button variant="ghost" className="h-9 rounded-xl" onClick={logout}>
              <LogOut className="size-4" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Waitlist signups', value: stats.waitlistSignups },
            { label: 'Last 7 days', value: stats.signupsLast7Days },
            { label: 'Page views', value: stats.pageViews },
            { label: 'Waitlist opens', value: stats.waitlistOpens },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-2xl border border-[#0B1220]/8 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#64748B]">
                {card.label}
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-[#0B1220]">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-[#0B1220]/8 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-[#0B1220]/8 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-[#0B1220]">
              <Users className="size-4 text-[#38b6ff]" />
              <h2 className="text-sm font-semibold">People who are interested</h2>
              <span className="text-sm text-[#64748B]">({filtered.length})</span>
            </div>
            <div className="relative w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#94A3B8]" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, email, company…"
                className="h-10 pl-9"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#F8FAFC] text-xs uppercase tracking-wider text-[#64748B]">
                <tr>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Company</th>
                  <th className="px-5 py-3 font-medium">Role</th>
                  <th className="px-5 py-3 font-medium">Notes</th>
                  <th className="px-5 py-3 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-[#64748B]">
                      No waitlist signups yet.
                    </td>
                  </tr>
                ) : (
                  filtered.map((entry) => (
                    <tr key={entry.id} className="border-t border-[#0B1220]/6 align-top">
                      <td className="px-5 py-3 font-medium text-[#0B1220]">{entry.name}</td>
                      <td className="px-5 py-3">
                        <a className="text-[#38b6ff] hover:underline" href={`mailto:${entry.email}`}>
                          {entry.email}
                        </a>
                      </td>
                      <td className="px-5 py-3 text-[#475569]">{entry.company || '—'}</td>
                      <td className="px-5 py-3 text-[#475569]">{entry.roleTitle || '—'}</td>
                      <td className="max-w-xs px-5 py-3 text-[#475569]">{entry.notes || '—'}</td>
                      <td className="whitespace-nowrap px-5 py-3 text-[#64748B]">
                        {new Date(entry.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-xs text-[#94A3B8]">
          This dashboard is independent of the product app. Unique sessions tracked:{' '}
          {stats.uniqueSessions}.
        </p>
      </div>
    </main>
  );
}
