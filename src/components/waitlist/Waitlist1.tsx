'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { BackgroundBeams } from '@/components/ui/aceternity/BackgroundBeams';
import { BackgroundLines } from '@/components/ui/background-lines';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LaunchCountdown } from '@/components/waitlist/LaunchCountdown';
import { joinWaitlist } from '@/lib/config';
import { trackLandingEvent } from '@/lib/analytics';
import { BRAND } from '@/lib/brand';
import { cn } from '@/lib/utils';

const AVATARS = ['AK', 'MR', 'JL', 'SC', 'DT', 'NP'] as const;

function nameFromEmail(email: string) {
  const local = email.split('@')[0]?.trim() || 'Operator';
  return local
    .replace(/[._+-]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .slice(0, 80);
}

type Waitlist1Props = {
  className?: string;
};

/** Shadcnblocks Waitlist 1 pattern + launch countdown — dark Aceternity flash. */
export function Waitlist1({ className }: Waitlist1Props) {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const trimmed = email.trim();
      const result = await joinWaitlist({
        email: trimmed,
        name: nameFromEmail(trimmed),
        website,
        source: 'waitlist1',
      });
      void trackLandingEvent('waitlist_submit');
      setDone(result.message);
      setEmail('');
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
              onClick={() => setDone(null)}
            >
              Add another email
            </button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="relative z-20 mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:border sm:border-white/15 sm:bg-white/10 sm:p-1.5 sm:shadow-[0_0_40px_-12px_rgba(56,189,248,0.45)] sm:backdrop-blur"
          >
            <label htmlFor="waitlist-email" className="sr-only">
              Work email
            </label>
            <Input
              id="waitlist-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full rounded-xl border-white/15 bg-white/10 text-white shadow-none ring-0 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-sky-400 sm:h-11 sm:rounded-full sm:border-none sm:bg-transparent sm:focus-visible:ring-0"
              placeholder="Enter your work email"
              disabled={submitting}
            />
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
            <Button
              type="submit"
              disabled={submitting}
              className="h-12 shrink-0 rounded-xl bg-gradient-to-r from-sky-400 to-cyan-500 px-6 text-[14px] font-semibold text-slate-950 shadow-[0_8px_24px_-12px_rgba(56,189,248,0.9)] hover:brightness-110 sm:h-11 sm:rounded-full"
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
        )}

        {error ? (
          <p className="relative z-20 mt-3 text-center text-sm text-red-400" role="alert">
            {error}
          </p>
        ) : null}

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
