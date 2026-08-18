'use client';

import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { cn } from '@/lib/utils';

export type StickyTourItem = {
  eyebrow: string;
  title: string;
  description: string;
  content?: React.ReactNode;
};

/** Premium Aceternity-style sticky product tour for high-res screenshots. */
export function StickyScroll({
  content,
  className,
}: {
  content: StickyTourItem[];
  contentClassName?: string;
  className?: string;
}) {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.35', 'end 0.55'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const cardLength = content.length;
    const cardsBreakpoints = content.map((_, index) => index / Math.max(cardLength - 1, 1));
    const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint);
      if (distance < Math.abs(latest - cardsBreakpoints[acc])) return index;
      return acc;
    }, 0);
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <div ref={ref} className={cn('relative', className)}>
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)] lg:gap-12 xl:gap-16">
        {/* Copy column + step rail */}
        <div className="relative">
          <div
            className="absolute bottom-8 left-[15px] top-8 hidden w-px bg-[linear-gradient(180deg,transparent,color-mix(in_srgb,var(--brand-azure)_45%,transparent)_12%,color-mix(in_srgb,var(--brand-navy)_18%,transparent)_88%,transparent)] md:block"
            aria-hidden
          />

          <div className="space-y-0">
            {content.map((item, index) => {
              const active = activeCard === index;
              return (
                <div
                  key={item.title}
                  className="relative py-14 first:pt-2 last:pb-20 md:py-20 md:pl-12"
                >
                  <span
                    className={cn(
                      'absolute left-0 top-[4.25rem] hidden size-[31px] items-center justify-center rounded-full border text-[11px] font-bold tabular-nums transition-all duration-300 md:flex',
                      active
                        ? 'border-[var(--brand-azure)] bg-[var(--brand-navy)] text-white shadow-[0_0_0_6px_color-mix(in_srgb,var(--brand-azure)_18%,transparent)]'
                        : 'border-[#dbe3ec] bg-white text-[#94A3B8]'
                    )}
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <motion.div
                    animate={{
                      opacity: active ? 1 : 0.32,
                      y: active ? 0 : 6,
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p
                      className={cn(
                        'text-[11px] font-semibold uppercase tracking-[0.16em]',
                        active ? 'text-[var(--brand-azure-deep)]' : 'text-[#94A3B8]'
                      )}
                    >
                      {item.eyebrow}
                    </p>
                    <h3 className="mt-3 text-2xl font-bold tracking-tight text-[var(--brand-ink)] md:text-[1.85rem] md:leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#475569] md:text-[16px]">
                      {item.description}
                    </p>
                  </motion.div>

                  {/* Mobile: stacked product frame */}
                  <div className="mt-7 lg:hidden">
                    <ProductChrome label={item.eyebrow}>{item.content}</ProductChrome>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sticky product stage */}
        <div className="sticky top-24 hidden self-start lg:block">
          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-8 rounded-[2rem] bg-[radial-gradient(ellipse_at_50%_40%,rgba(26,143,214,0.16),transparent_65%)]"
              aria-hidden
            />
            <ProductChrome label={content[activeCard]?.eyebrow ?? 'DotLinQ'}>
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={content[activeCard]?.title ?? activeCard}
                    initial={{ opacity: 0, y: 12, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.99 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    {content[activeCard]?.content}
                  </motion.div>
                </AnimatePresence>
              </div>
            </ProductChrome>

            <div className="mt-5 flex items-center justify-center gap-2">
              {content.map((item, index) => (
                <span
                  key={item.title}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    activeCard === index
                      ? 'w-8 bg-[var(--brand-azure)]'
                      : 'w-1.5 bg-[color-mix(in_srgb,var(--brand-navy)_18%,transparent)]'
                  )}
                  aria-hidden
                />
              ))}
            </div>
            <p className="mt-3 text-center text-[12px] font-medium text-[#64748B]">
              {content[activeCard]?.eyebrow}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductChrome({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--brand-navy)_12%,transparent)] bg-white shadow-[0_32px_90px_-42px_rgba(10,22,40,0.55)] ring-1 ring-black/[0.03]">
      <div className="flex items-center gap-2 border-b border-[color-mix(in_srgb,var(--brand-navy)_8%,transparent)] bg-[linear-gradient(180deg,#F8FBFD,#EEF3F8)] px-3.5 py-2.5">
        <span className="size-2 rounded-full bg-[#F87171]" />
        <span className="size-2 rounded-full bg-[#FBBF24]" />
        <span className="size-2 rounded-full bg-[#34D399]" />
        <span className="ml-2 truncate rounded-md bg-white/80 px-2.5 py-0.5 text-[11px] font-medium text-[#64748B] ring-1 ring-[color-mix(in_srgb,var(--brand-navy)_8%,transparent)]">
          app.dotlinq.com · {label}
        </span>
      </div>
      <div className="bg-white">{children}</div>
    </div>
  );
}
