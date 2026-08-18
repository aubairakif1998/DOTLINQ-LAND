'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type StudioStep = {
  id: string;
  step: string;
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
  content: React.ReactNode;
};

const AUTO_MS = 4500;

/** Horizontal product stepper + projection — Aceternity-inspired tabs/stepper. */
export function StudioHorizontalTour({
  steps,
  defaultId,
  tone = 'light',
  autoPlay = true,
  intervalMs = AUTO_MS,
}: {
  steps: StudioStep[];
  /** Defaults to the first step (01). */
  defaultId?: string;
  tone?: 'light' | 'dark';
  autoPlay?: boolean;
  intervalMs?: number;
}) {
  const reduceMotion = useReducedMotion();
  const initial = steps.find((s) => s.id === defaultId) ?? steps[0];
  const [activeId, setActiveId] = useState(initial?.id ?? '');
  const [paused, setPaused] = useState(false);
  const userTouched = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeIndex = Math.max(0, steps.findIndex((s) => s.id === activeId));
  const active = steps[activeIndex] ?? steps[0];
  const dark = tone === 'dark';

  const selectStep = (id: string, fromUser = false) => {
    if (fromUser) {
      userTouched.current = true;
      setPaused(true);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      resumeTimer.current = setTimeout(() => {
        userTouched.current = false;
        setPaused(false);
      }, intervalMs * 1.5);
    }
    setActiveId(id);
  };

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!autoPlay || reduceMotion || paused || steps.length < 2) return;

    const id = window.setInterval(() => {
      if (userTouched.current) return;
      setActiveId((current) => {
        const idx = steps.findIndex((s) => s.id === current);
        const next = (idx + 1) % steps.length;
        return steps[next]?.id ?? current;
      });
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [autoPlay, reduceMotion, paused, steps, intervalMs]);

  if (!active) return null;

  return (
    <div
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        if (!userTouched.current) setPaused(false);
      }}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null) && !userTouched.current) {
          setPaused(false);
        }
      }}
    >
      <div className="relative mx-auto max-w-4xl">
        <div
          className={cn(
            'absolute left-[8%] right-[8%] top-[22px] hidden h-px sm:block',
            dark ? 'bg-white/15' : 'bg-[color-mix(in_srgb,var(--brand-navy)_12%,transparent)]'
          )}
          aria-hidden
        />
        <div
          className="absolute left-[8%] top-[22px] hidden h-px bg-sky-400 transition-all duration-500 sm:block"
          style={{
            width: `${(activeIndex / Math.max(steps.length - 1, 1)) * 84}%`,
          }}
          aria-hidden
        />

        <ol className="relative grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.id === activeId;
            const isDone = index < activeIndex;
            return (
              <li key={step.id}>
                <button
                  type="button"
                  onClick={() => selectStep(step.id, true)}
                  aria-current={isActive ? 'step' : undefined}
                  className={cn(
                    'group relative flex w-full flex-col items-center rounded-2xl border px-4 py-5 text-center transition-all duration-300',
                    dark
                      ? isActive
                        ? 'border-sky-400/40 bg-white/10 shadow-[0_0_40px_-12px_rgba(56,189,248,0.55)] backdrop-blur'
                        : 'border-transparent bg-transparent hover:border-white/10 hover:bg-white/5'
                      : isActive
                        ? 'border-[color-mix(in_srgb,var(--brand-azure)_40%,transparent)] bg-white shadow-[0_18px_50px_-28px_rgba(10,22,40,0.45)]'
                        : 'border-transparent bg-transparent hover:border-[color-mix(in_srgb,var(--brand-navy)_10%,transparent)] hover:bg-white/70'
                  )}
                >
                  <span
                    className={cn(
                      'relative z-[1] flex size-11 items-center justify-center rounded-full border text-[12px] font-bold tabular-nums transition-all duration-300',
                      isActive
                        ? 'border-sky-400 bg-sky-400 text-slate-950 shadow-[0_0_0_6px_rgba(56,189,248,0.2)]'
                        : isDone
                          ? dark
                            ? 'border-sky-400/50 bg-sky-400/15 text-sky-300'
                            : 'border-[var(--brand-azure)] bg-[#E8F4FC] text-[var(--brand-azure-deep)]'
                          : dark
                            ? 'border-white/20 bg-white/5 text-slate-400'
                            : 'border-[#dbe3ec] bg-white text-[#94A3B8]'
                    )}
                  >
                    {step.step}
                  </span>
                  <span
                    className={cn(
                      'mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em]',
                      isActive
                        ? dark
                          ? 'text-sky-300'
                          : 'text-[var(--brand-azure-deep)]'
                        : dark
                          ? 'text-slate-500'
                          : 'text-[#94A3B8]'
                    )}
                  >
                    <Icon className="size-3.5" />
                    {step.label}
                  </span>
                  <span
                    className={cn(
                      'mt-2 text-[14px] font-bold tracking-tight transition-colors',
                      isActive
                        ? dark
                          ? 'text-white'
                          : 'text-[var(--brand-ink)]'
                        : dark
                          ? 'text-slate-400'
                          : 'text-[#64748B]'
                    )}
                  >
                    {step.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={active.id + '-desc'}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28 }}
          className={cn(
            'mx-auto mt-8 max-w-2xl text-center text-[15px] leading-relaxed md:text-[16px]',
            dark ? 'text-slate-300' : 'text-[#475569]'
          )}
        >
          {active.description}
        </motion.p>
      </AnimatePresence>

      <div className="relative mx-auto mt-10 max-w-6xl">
        <div
          className={cn(
            'pointer-events-none absolute -inset-6 rounded-[2rem]',
            dark
              ? 'bg-[radial-gradient(ellipse_at_50%_30%,rgba(56,189,248,0.28),transparent_65%)]'
              : 'bg-[radial-gradient(ellipse_at_50%_30%,rgba(26,143,214,0.14),transparent_65%)]'
          )}
          aria-hidden
        />
        <div
          className={cn(
            'relative overflow-hidden rounded-2xl border bg-white shadow-[0_36px_100px_-48px_rgba(10,22,40,0.55)] ring-1 ring-black/[0.03]',
            dark
              ? 'border-sky-400/25 shadow-[0_36px_100px_-40px_rgba(14,165,233,0.55)]'
              : 'border-[color-mix(in_srgb,var(--brand-navy)_12%,transparent)]'
          )}
        >
          <div className="flex items-center gap-2 border-b border-[color-mix(in_srgb,var(--brand-navy)_8%,transparent)] bg-[linear-gradient(180deg,#F8FBFD,#EEF3F8)] px-4 py-2.5">
            <span className="size-2 rounded-full bg-[#F87171]" />
            <span className="size-2 rounded-full bg-[#FBBF24]" />
            <span className="size-2 rounded-full bg-[#34D399]" />
            <span className="ml-2 truncate rounded-md bg-white/85 px-2.5 py-0.5 text-[11px] font-medium text-[#64748B] ring-1 ring-[color-mix(in_srgb,var(--brand-navy)_8%,transparent)]">
              app.dotlinq.com · {active.label}
            </span>
            <span className="ml-auto hidden text-[11px] font-semibold text-[var(--brand-azure-deep)] sm:inline">
              Step {active.step} of {String(steps.length).padStart(2, '0')}
            </span>
          </div>

          <div className="relative aspect-[16/9] w-full bg-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 14, scale: 0.988 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.992 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                {active.content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
