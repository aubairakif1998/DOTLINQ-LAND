'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { BackgroundBeams } from '@/components/ui/aceternity/BackgroundBeams';
import { BackgroundLines } from '@/components/ui/background-lines';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { LaunchCountdown } from '@/components/waitlist/LaunchCountdown';
import { joinWaitlist } from '@/lib/config';
import { trackLandingEvent } from '@/lib/analytics';
import { BRAND } from '@/lib/brand';
import { cn } from '@/lib/utils';

const AVATARS = ['AK', 'MR', 'JL', 'SC', 'DT', 'NP'] as const;

const emptyForm = {
  name: '',
  email: '',
  company: '',
  roleTitle: '',
  notes: '',
  website: '',
};

type Waitlist1Props = {
  className?: string;
};

const fieldClass =
  'h-11 rounded-xl border-white/15 bg-white/10 text-white shadow-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-sky-400';

const labelClass = 'text-[13px] font-medium text-slate-300';

/** Shadcnblocks Waitlist 1 pattern + full signup fields — dark Aceternity flash. */
export function Waitlist1({ className }: Waitlist1Props) {
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  const openForm = () => {
    setError(null);
    setFormOpen(true);
    void trackLandingEvent('waitlist_open');
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const result = await joinWaitlist({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim() || undefined,
        roleTitle: form.roleTitle.trim() || undefined,
        notes: form.notes.trim() || undefined,
        website: form.website,
        source: 'waitlist1',
      });
      void trackLandingEvent('waitlist_submit');
      setDone(result.message);
      setForm(emptyForm);
      setFormOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="waitlist"
      className={cn(
        'relative flex min-h-[720px] items-center justify-center overflow-hidden border-y border-white/10 dl-hero-dark py-20 sm:min-h-[800px] sm:py-28',
        className
      )}
    >
      <BackgroundBeams variant="dark" className="opacity-70" />
      <BackgroundLines className="relative container flex w-full flex-col items-center justify-center px-4 opacity-90">
        <div className="relative z-20 mb-8 sm:mb-10">
          <LaunchCountdown tone="dark" />
        </div>

        <p className="relative z-20 mb-3 text-center text-[12px] font-semibold uppercase tracking-[0.16em] text-sky-300">
          {BRAND.launchLabel} · {BRAND.launchDate}
        </p>

        <h2 className="relative z-20 max-w-4xl bg-gradient-to-b from-white to-slate-300 bg-clip-text py-2 text-center font-sans text-4xl font-semibold tracking-tighter text-transparent sm:text-5xl md:py-6 lg:text-7xl xl:text-8xl">
          Join the Waitlist
        </h2>

        <p className="relative z-20 mx-auto mt-2 max-w-xl text-center text-[15px] leading-relaxed text-slate-300 sm:text-[17px] lg:text-lg">
          Be first in line when DotLinQ opens on {BRAND.launchDate}. Early access for enterprises
          that run partner networks as commercial infrastructure — not a side project.
        </p>

        {done ? (
          <div className="relative z-20 mt-10 flex max-w-md flex-col items-center gap-3 rounded-2xl border border-sky-400/30 bg-sky-400/10 px-6 py-5 text-center backdrop-blur">
            <CheckCircle2 className="size-8 text-sky-300" />
            <p className="text-[15px] font-semibold text-white">{done}</p>
            <button
              type="button"
              className="text-[13px] font-medium text-sky-300 underline-offset-2 hover:underline"
              onClick={() => {
                setDone(null);
                openForm();
              }}
            >
              Add another signup
            </button>
          </div>
        ) : formOpen ? (
          <form
            onSubmit={onSubmit}
            className="relative z-20 mt-10 w-full max-w-lg rounded-2xl border border-white/15 bg-white/10 p-5 shadow-[0_0_40px_-12px_rgba(56,189,248,0.35)] backdrop-blur sm:p-6"
          >
            <div className="grid gap-3.5">
              <div className="grid gap-1.5">
                <Label htmlFor="waitlist1-name" className={labelClass}>
                  Name
                </Label>
                <Input
                  id="waitlist1-name"
                  required
                  autoComplete="name"
                  autoFocus
                  placeholder="Alex Morgan"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  disabled={submitting}
                  className={fieldClass}
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="waitlist1-email" className={labelClass}>
                  Work email
                </Label>
                <Input
                  id="waitlist1-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="alex@company.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  disabled={submitting}
                  className={fieldClass}
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="waitlist1-company" className={labelClass}>
                    Company{' '}
                    <span className="font-normal text-slate-500">(optional)</span>
                  </Label>
                  <Input
                    id="waitlist1-company"
                    autoComplete="organization"
                    placeholder="Acme Logistics"
                    value={form.company}
                    onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                    disabled={submitting}
                    className={fieldClass}
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="waitlist1-role" className={labelClass}>
                    Designation{' '}
                    <span className="font-normal text-slate-500">(optional)</span>
                  </Label>
                  <Input
                    id="waitlist1-role"
                    placeholder="Integration lead"
                    value={form.roleTitle}
                    onChange={(e) => setForm((f) => ({ ...f, roleTitle: e.target.value }))}
                    disabled={submitting}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="waitlist1-notes" className={labelClass}>
                  What are you looking to connect?{' '}
                  <span className="font-normal text-slate-500">(optional)</span>
                </Label>
                <Textarea
                  id="waitlist1-notes"
                  placeholder="Partner networks, systems of record, APIs…"
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  disabled={submitting}
                  className="min-h-[88px] rounded-xl border-white/15 bg-white/10 text-white shadow-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-sky-400"
                />
              </div>

              <div
                className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden"
                aria-hidden
              >
                <Label htmlFor="waitlist1-website">Website</Label>
                <Input
                  id="waitlist1-website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
                />
              </div>
            </div>

            {error ? (
              <p className="mt-3 text-center text-sm text-red-400" role="alert">
                {error}
              </p>
            ) : null}

            <Button
              type="submit"
              disabled={submitting}
              className="mt-5 h-12 w-full rounded-xl bg-gradient-to-r from-sky-400 to-cyan-500 text-[14px] font-semibold text-slate-950 shadow-[0_8px_24px_-12px_rgba(56,189,248,0.9)] hover:brightness-110"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Joining…
                </>
              ) : (
                'Join the Waitlist'
              )}
            </Button>
          </form>
        ) : (
          <div className="relative z-20 mt-10">
            <Button
              type="button"
              onClick={openForm}
              className="h-12 rounded-full bg-gradient-to-r from-sky-400 to-cyan-500 px-8 text-[14px] font-semibold text-slate-950 shadow-[0_8px_24px_-12px_rgba(56,189,248,0.9)] hover:brightness-110 sm:h-11"
            >
              Join the Waitlist
            </Button>
          </div>
        )}

        <div className="relative z-20 mt-10 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center -space-x-2.5">
            {AVATARS.map((initials) => (
              <Avatar key={initials} className="size-8 border border-white/20 shadow-sm">
                <AvatarFallback className="bg-slate-800 text-slate-200">{initials}</AvatarFallback>
              </Avatar>
            ))}
          </span>
          <p className="text-[14px] tracking-tight text-slate-400">
            Operators already securing early access
          </p>
        </div>
      </BackgroundLines>
    </section>
  );
}
