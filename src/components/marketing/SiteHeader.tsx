'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { Button } from '@/components/ui/button';
import { NAV } from '@/lib/marketing-content';
import { cn } from '@/lib/utils';

type SiteHeaderProps = {
  onJoinWaitlist: () => void;
};

const NAV_ITEMS = [
  NAV.products,
  NAV.solutions,
  NAV.industry,
  NAV.knowledge,
  NAV.about,
] as const;

export function SiteHeader({ onJoinWaitlist }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      setOverHero(y < Math.min(window.innerHeight * 0.72, 640));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  const clearClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const scheduleClose = () => {
    clearClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  const darkNav = overHero && !mobileOpen;

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300',
        darkNav
          ? 'border-sky-400/20 bg-[linear-gradient(180deg,rgba(3,10,24,0.94)_0%,rgba(6,16,36,0.9)_100%)] shadow-[0_12px_40px_-16px_rgba(14,165,233,0.45)]'
          : scrolled
            ? 'border-[color-mix(in_srgb,var(--brand-navy)_10%,transparent)] bg-white/95 shadow-[0_10px_30px_-20px_rgba(10,22,40,0.35)]'
            : 'border-[color-mix(in_srgb,var(--brand-navy)_7%,transparent)] bg-white/95'
      )}
    >
      {darkNav ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent"
          aria-hidden
        />
      ) : null}
      <div className="dl-container relative flex h-[4.25rem] items-center justify-between gap-4">
        <a
          href="/"
          className={cn(
            'shrink-0 rounded-xl transition-opacity hover:opacity-95',
            darkNav &&
              'bg-white px-2.5 py-1.5 shadow-[0_0_28px_-8px_rgba(56,189,248,0.65)] ring-1 ring-sky-300/40'
          )}
          onClick={closeAll}
        >
          <BrandLogo size="md" />
        </a>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const isOpen = openMenu === item.label;
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => {
                  clearClose();
                  setOpenMenu(item.label);
                }}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  className={cn(
                    'inline-flex h-10 items-center gap-1 rounded-md px-3 text-[14px] font-medium transition-colors duration-200',
                    darkNav
                      ? cn(
                          'text-white/90 hover:bg-sky-400/15 hover:text-white',
                          isOpen && 'bg-sky-400/20 text-white shadow-[0_0_20px_-8px_rgba(56,189,248,0.7)]'
                        )
                      : cn(
                          'text-[var(--brand-ink)]/80 hover:bg-[var(--brand-mist)] hover:text-[var(--brand-ink)]',
                          isOpen && 'bg-[var(--brand-mist)] text-[var(--brand-ink)]'
                        )
                  )}
                  aria-expanded={isOpen}
                  onClick={() => setOpenMenu(isOpen ? null : item.label)}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      'size-3.5 opacity-60 transition-transform duration-200',
                      darkNav && 'opacity-80',
                      isOpen && 'rotate-180'
                    )}
                  />
                </button>

                {isOpen ? (
                  <div
                    className="absolute left-0 top-full z-50 pt-2"
                    onMouseEnter={clearClose}
                    onMouseLeave={scheduleClose}
                  >
                    <div
                      className={cn(
                        'animate-in fade-in-0 zoom-in-95 origin-top-left rounded-xl border border-[color-mix(in_srgb,var(--brand-navy)_10%,transparent)] bg-white p-5 shadow-[0_24px_60px_-28px_rgba(10,22,40,0.35)] duration-200',
                        item.columns.length > 1 ? 'w-[36rem]' : 'w-[22rem]'
                      )}
                    >
                      <div
                        className={cn(
                          'grid gap-6',
                          item.columns.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
                        )}
                      >
                        {item.columns.map((col) => (
                          <div key={col.heading}>
                            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-azure-deep)]">
                              {col.heading}
                            </p>
                            <ul className="space-y-1">
                              {col.links.map((link) => (
                                <li key={link.title}>
                                  <a
                                    href={link.href}
                                    className="block rounded-lg px-2.5 py-2 transition-colors duration-150 hover:bg-[var(--brand-mist)]"
                                    onClick={closeAll}
                                  >
                                    <span className="block text-[14px] font-medium text-[var(--brand-ink)]">
                                      {link.title}
                                    </span>
                                    <span className="mt-0.5 block text-[12.5px] leading-snug text-[#64748B]">
                                      {link.description}
                                    </span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 border-t border-[color-mix(in_srgb,var(--brand-navy)_8%,transparent)] pt-3">
                        <button
                          type="button"
                          className="text-[13px] font-semibold text-[var(--brand-azure-deep)] transition-colors hover:text-[var(--brand-navy)]"
                          onClick={() => {
                            closeAll();
                            onJoinWaitlist();
                          }}
                        >
                          Join the waitlist →
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className={cn(
              'hidden text-[13px] font-medium transition xl:inline',
              darkNav
                ? 'text-sky-200/90 hover:text-white'
                : 'text-[var(--brand-ink)]/70 hover:text-[var(--brand-ink)]'
            )}
            onClick={onJoinWaitlist}
          >
            Contact
          </button>
          <button
            type="button"
            className={cn(
              'hidden h-10 items-center rounded-md px-4 text-[14px] font-semibold transition-all duration-200 sm:inline-flex',
              darkNav
                ? 'bg-gradient-to-r from-sky-300 via-sky-400 to-cyan-400 text-slate-950 shadow-[0_0_28px_-6px_rgba(56,189,248,0.95)] hover:brightness-110'
                : 'border border-[color-mix(in_srgb,var(--brand-navy)_18%,transparent)] text-[var(--brand-navy)] hover:border-[var(--brand-azure)] hover:bg-[var(--brand-mist)]'
            )}
            onClick={onJoinWaitlist}
          >
            Join waitlist
          </button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn('lg:hidden', darkNav && 'text-white hover:bg-white/10 hover:text-white')}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="animate-in slide-in-from-top-2 border-t border-[color-mix(in_srgb,var(--brand-navy)_8%,transparent)] bg-white duration-200 lg:hidden">
          <div className="dl-container space-y-1 py-4">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="border-b border-[color-mix(in_srgb,var(--brand-navy)_7%,transparent)] py-2"
              >
                <a
                  href={item.href}
                  className="block py-2 text-[15px] font-semibold text-[var(--brand-ink)]"
                  onClick={closeAll}
                >
                  {item.label}
                </a>
                <div className="space-y-1 pb-2 pl-1">
                  {item.columns.flatMap((col) =>
                    col.links.map((link) => (
                      <a
                        key={link.title}
                        href={link.href}
                        className="block py-1.5 text-[13.5px] text-[#475569]"
                        onClick={closeAll}
                      >
                        {link.title}
                      </a>
                    ))
                  )}
                </div>
              </div>
            ))}
            <button
              type="button"
              className="dl-btn-primary mt-3 w-full"
              onClick={() => {
                closeAll();
                onJoinWaitlist();
              }}
            >
              Join waitlist
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
