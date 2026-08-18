'use client';

import Link from 'next/link';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/marketing/Motion';
import { ARTICLES } from '@/lib/articles';

/** Aceternity-inspired blog / knowledge grid — links to real article routes. */
export function BlogSection() {
  return (
    <section id="knowledge" className="scroll-mt-24 border-b dl-divider bg-white dl-section">
      <div className="dl-container">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Reveal className="max-w-2xl">
            <p className="dl-eyebrow">Knowledge Hub</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Insights for leaders who run partner ecosystems
            </h2>
            <p className="mt-3 text-[15px] text-[#64748B]">
              Full articles on strategy, intelligence, and operations — written for global partner
              networks.
            </p>
          </Reveal>
          <Reveal>
            <Link href="/knowledge" className="dl-btn-ghost">
              All articles
            </Link>
          </Reveal>
        </div>

        <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
          {ARTICLES.map((post) => (
            <StaggerItem key={post.slug}>
              <Link
                href={`/knowledge/${post.slug}`}
                className="dl-card group block h-full overflow-hidden p-0"
              >
                <div className="h-28 bg-[linear-gradient(135deg,#0A1628_0%,#1A8FD6_100%)] p-5">
                  <span className="inline-flex rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-[12px] text-[#64748B]">
                    <BookOpen className="size-3.5 text-[var(--brand-azure-deep)]" />
                    {post.date} · {post.readingMinutes} min
                  </div>
                  <h3 className="mt-3 text-[16px] font-bold transition-colors group-hover:text-[var(--brand-azure-deep)]">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#64748B]">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--brand-azure-deep)]">
                    Read article <ArrowUpRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
