'use client';

import { useEffect, useState } from 'react';
import { BRAND } from '@/lib/brand';
import { cn } from '@/lib/utils';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function getTimeLeft(targetMs: number): TimeLeft {
  const diff = Math.max(0, targetMs - Date.now());
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, done: false };
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

type LaunchCountdownProps = {
  className?: string;
  compact?: boolean;
  /** Dark glass cards for cinematic sections */
  tone?: 'light' | 'dark';
};

export function LaunchCountdown({ className, compact, tone = 'light' }: LaunchCountdownProps) {
  const dark = tone === 'dark' || compact;
  const targetMs = Date.parse(BRAND.launchIso);
  // null until mount — avoids SSR/client clock mismatch hydration errors
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(getTimeLeft(targetMs));
    const id = window.setInterval(() => setTime(getTimeLeft(targetMs)), 1000);
    return () => window.clearInterval(id);
  }, [targetMs]);

  const display = time ?? { days: 0, hours: 0, minutes: 0, seconds: 0, done: false };
  const units = [
    { label: 'Days', value: display.days },
    { label: 'Hours', value: display.hours },
    { label: 'Mins', value: display.minutes },
    { label: 'Secs', value: display.seconds },
  ] as const;

  if (time?.done) {
    return (
      <div
        className={cn(
          'relative z-20 rounded-2xl border px-5 py-3 text-center text-sm font-semibold backdrop-blur',
          dark
            ? 'border-sky-400/30 bg-sky-400/10 text-sky-200'
            : 'border-[color-mix(in_srgb,var(--brand-azure)_30%,transparent)] bg-white/80 text-[var(--brand-azure-deep)]',
          className
        )}
      >
        DotLinQ is launching now — {BRAND.launchDate}
      </div>
    );
  }

  return (
    <div
      className={cn('relative z-20 w-full max-w-xl', className)}
      aria-live="polite"
      suppressHydrationWarning
    >
      <p
        className={cn(
          'mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.16em]',
          dark ? 'text-sky-300' : 'text-[var(--brand-azure-deep)]'
        )}
      >
        Countdown to launch · {BRAND.launchDateShort}
      </p>
      <div
        className={cn(
          'grid grid-cols-4 gap-2 sm:gap-3',
          compact && 'gap-1.5 sm:gap-2',
          !time && 'opacity-70'
        )}
      >
        {units.map((unit) => (
          <div
            key={unit.label}
            className={cn(
              'rounded-2xl border px-2 py-3 text-center backdrop-blur sm:px-3 sm:py-4',
              dark
                ? 'border-white/15 bg-white/10 shadow-[0_0_30px_-12px_rgba(56,189,248,0.45)]'
                : 'border-[#dbe3ec] bg-white/90 shadow-[0_8px_30px_rgba(10,22,40,0.06)]',
              compact && 'rounded-xl py-2.5 sm:py-3'
            )}
          >
            <div
              className={cn(
                'font-mono text-2xl font-bold tracking-tight tabular-nums sm:text-3xl lg:text-4xl',
                dark ? 'text-white' : 'text-[var(--brand-navy)]',
                compact && 'text-xl sm:text-2xl lg:text-3xl'
              )}
              suppressHydrationWarning
            >
              {!time ? '—' : unit.label === 'Days' ? unit.value : pad(unit.value)}
            </div>
            <div
              className={cn(
                'mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] sm:text-[11px]',
                dark ? 'text-slate-400' : 'text-[#64748B]'
              )}
            >
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
