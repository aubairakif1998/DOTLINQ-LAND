'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, ShieldCheck } from 'lucide-react';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { Button } from '@/components/ui/button';
import {
  ARTICLES,
  EDI_SERVICE_SCOPE,
  type Article,
} from '@/lib/articles';
import { BRAND } from '@/lib/brand';
import { cn } from '@/lib/utils';

function KnowledgeChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 border-b border-[color-mix(in_srgb,var(--brand-navy)_10%,transparent)] bg-white/95 backdrop-blur-md">
        <div className="dl-container flex h-[4.25rem] items-center justify-between gap-4">
          <Link href="/" className="shrink-0 transition-opacity hover:opacity-90">
            <BrandLogo size="md" />
          </Link>
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/knowledge"
              className="hidden text-[14px] font-medium text-[#475569] transition hover:text-[var(--brand-ink)] sm:inline"
            >
              Knowledge Hub
            </Link>
            <Button asChild className="h-10 rounded-md bg-[var(--brand-navy)] px-4 text-[13px] font-semibold hover:bg-[var(--brand-azure-deep)]">
              <Link href="/#waitlist">Join waitlist</Link>
            </Button>
          </nav>
        </div>
      </header>
      {children}
      <footer className="border-t border-[color-mix(in_srgb,var(--brand-navy)_10%,transparent)] bg-[var(--brand-mist)]">
        <div className="dl-container flex flex-col gap-3 py-8 text-[13px] text-[#64748B] sm:flex-row sm:items-center sm:justify-between">
          <p>
            {BRAND.copyright} · {EDI_SERVICE_SCOPE.badge}
          </p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-[var(--brand-ink)]">
              Home
            </Link>
            <Link href="/knowledge" className="hover:text-[var(--brand-ink)]">
              Articles
            </Link>
            <Link href="/#contact" className="hover:text-[var(--brand-ink)]">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function EdiScopeCallout({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        'rounded-2xl border border-[color-mix(in_srgb,var(--brand-azure)_28%,transparent)] bg-[#E8F4FC]/70 p-5 sm:p-6',
        className
      )}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-navy)] text-white">
          <ShieldCheck className="size-4" />
        </span>
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--brand-azure-deep)]">
            {EDI_SERVICE_SCOPE.title}
          </p>
          <p className="mt-2 text-[14.5px] leading-relaxed text-[#334155]">{EDI_SERVICE_SCOPE.long}</p>
        </div>
      </div>
    </aside>
  );
}

export function KnowledgeIndex() {
  return (
    <KnowledgeChrome>
      <main className="dl-container py-14 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="dl-eyebrow">Knowledge Hub</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Insights for leaders who run partner ecosystems
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-[#475569]">
            Strategy notes from the DotLinQ team — written for executives and operators who treat
            partner exchange as commercial infrastructure.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <EdiScopeCallout />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/knowledge/${article.slug}`}
              className="dl-card group block h-full overflow-hidden p-0"
            >
              <div className="h-28 bg-[linear-gradient(135deg,#0A1628_0%,#1A8FD6_100%)] p-5">
                <span className="inline-flex rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                  {article.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-[12px] text-[#64748B]">
                  <BookOpen className="size-3.5 text-[var(--brand-azure-deep)]" />
                  {article.date} · {article.readingMinutes} min read
                </div>
                <h2 className="mt-3 text-[16px] font-bold transition-colors group-hover:text-[var(--brand-azure-deep)]">
                  {article.title}
                </h2>
                <p className="mt-2 text-[14px] leading-relaxed text-[#64748B]">{article.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--brand-azure-deep)]">
                  Read article <ArrowRight className="size-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </KnowledgeChrome>
  );
}

export function ArticlePage({ article }: { article: Article }) {
  const others = ARTICLES.filter((a) => a.slug !== article.slug);

  return (
    <KnowledgeChrome>
      <article className="dl-container py-12 sm:py-16">
        <Link
          href="/knowledge"
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--brand-azure-deep)] hover:underline"
        >
          <ArrowLeft className="size-3.5" />
          Knowledge Hub
        </Link>

        <header className="mx-auto mt-8 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full border border-[color-mix(in_srgb,var(--brand-azure)_30%,transparent)] bg-[#E8F4FC] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--brand-azure-deep)]">
              {article.category}
            </span>
            <span className="inline-flex rounded-full border border-[color-mix(in_srgb,var(--brand-navy)_12%,transparent)] bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
              {EDI_SERVICE_SCOPE.badge}
            </span>
          </div>
          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            {article.title}
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-[#475569]">{article.excerpt}</p>
          <p className="mt-4 text-[13px] text-[#64748B]">
            {article.date} · {article.readingMinutes} min read · DotLinQ Editorial
          </p>
        </header>

        <div className="mx-auto mt-10 max-w-3xl space-y-10">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{section.heading}</h2>
              <div className="mt-4 space-y-4 text-[16px] leading-relaxed text-[#475569]">
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
              </div>
            </section>
          ))}

          <p className="border-l-4 border-[var(--brand-azure)] pl-5 text-[17px] font-medium leading-relaxed text-[var(--brand-ink)]">
            {article.closing}
          </p>

          <EdiScopeCallout />

          <div className="rounded-2xl bg-[var(--brand-navy)] px-6 py-8 text-center sm:px-10">
            <h3 className="text-xl font-bold text-white sm:text-2xl">
              Launching {BRAND.launchDateShort}
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-[14.5px] text-white/65">
              Join the waitlist for early access to DotLinQ — EDI-scoped partner integration for
              global networks.
            </p>
            <Button
              asChild
              className="mt-6 h-11 rounded-md bg-[var(--brand-azure)] px-6 font-semibold text-white hover:bg-[var(--brand-azure-deep)]"
            >
              <Link href="/#waitlist">Join the waitlist</Link>
            </Button>
          </div>
        </div>

        {others.length > 0 ? (
          <aside className="mx-auto mt-16 max-w-3xl border-t border-[color-mix(in_srgb,var(--brand-navy)_10%,transparent)] pt-10">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#64748B]">
              More from Knowledge Hub
            </p>
            <ul className="mt-4 space-y-3">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/knowledge/${item.slug}`}
                    className="group flex items-start justify-between gap-4 rounded-xl border border-[color-mix(in_srgb,var(--brand-navy)_8%,transparent)] bg-[var(--brand-mist)] px-4 py-3.5 transition hover:border-[color-mix(in_srgb,var(--brand-azure)_35%,transparent)]"
                  >
                    <div>
                      <p className="text-[12px] font-semibold uppercase tracking-wider text-[var(--brand-azure-deep)]">
                        {item.category}
                      </p>
                      <p className="mt-1 text-[15px] font-semibold text-[var(--brand-ink)] group-hover:text-[var(--brand-azure-deep)]">
                        {item.title}
                      </p>
                    </div>
                    <ArrowRight className="mt-1 size-4 shrink-0 text-[var(--brand-azure-deep)]" />
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </article>
    </KnowledgeChrome>
  );
}
