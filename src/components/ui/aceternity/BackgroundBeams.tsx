'use client';

import { cn } from '@/lib/utils';

/** Aceternity-inspired beams + grid — tuned for dark cinematic heroes. */
export function BackgroundBeams({
  className,
  variant = 'dark',
}: {
  className?: string;
  variant?: 'dark' | 'light';
}) {
  const dark = variant === 'dark';

  return (
    <div
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      aria-hidden
    >
      <div
        className={cn(
          'absolute inset-0 [background-size:52px_52px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,#000_35%,transparent_100%)]',
          dark
            ? '[background-image:linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)]'
            : '[background-image:linear-gradient(to_right,#0a162814_1px,transparent_1px),linear-gradient(to_bottom,#0a162814_1px,transparent_1px)]'
        )}
      />
      <div
        className={cn(
          'dl-glow-orb absolute left-1/2 top-0 h-[520px] w-[720px] -translate-x-1/2 rounded-full blur-3xl',
          dark
            ? 'bg-[radial-gradient(circle,rgba(14,165,233,0.35),transparent_68%)]'
            : 'bg-[radial-gradient(circle,rgba(26,143,214,0.22),transparent_65%)]'
        )}
      />
      <div
        className={cn(
          'absolute -left-1/4 top-10 h-[420px] w-[55%] rounded-full blur-3xl',
          dark
            ? 'bg-[radial-gradient(circle,rgba(34,211,238,0.16),transparent_65%)]'
            : 'bg-[radial-gradient(circle,rgba(14,111,168,0.16),transparent_65%)]'
        )}
      />
      <div
        className={cn(
          'absolute -right-1/4 bottom-0 h-[380px] w-[50%] rounded-full blur-3xl',
          dark
            ? 'bg-[radial-gradient(circle,rgba(56,189,248,0.14),transparent_65%)]'
            : 'bg-[radial-gradient(circle,rgba(26,143,214,0.1),transparent_65%)]'
        )}
      />
      <svg
        className={cn('absolute inset-0 h-full w-full', dark ? 'opacity-70' : 'opacity-40')}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="dl-beam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
            <stop offset="40%" stopColor="#38BDF8" stopOpacity={dark ? '0.9' : '0.55'} />
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g stroke="url(#dl-beam)" strokeWidth="1.35" fill="none">
          <path
            d="M-40 180 C 180 40, 320 320, 560 120 S 900 260, 1200 80"
            className="dl-beam-path"
          />
          <path
            d="M-20 320 C 220 180, 380 420, 640 240 S 980 380, 1280 200"
            className="dl-beam-path dl-beam-path-delay"
          />
          <path
            d="M60 80 C 260 200, 400 20, 680 160 S 980 40, 1300 180"
            className="dl-beam-path dl-beam-path-slow"
          />
          <path
            d="M100 420 C 280 280, 480 500, 720 360 S 1040 480, 1320 300"
            className="dl-beam-path"
            style={{ animationDelay: '2.2s' }}
          />
        </g>
      </svg>
    </div>
  );
}

/** Soft spotlight shader used behind CTAs / contact. */
export function SpotlightShader({ className }: { className?: string }) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      aria-hidden
    >
      <div className="absolute left-1/2 top-0 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.35),transparent_68%)] blur-2xl" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_30%,transparent_100%)]" />
    </div>
  );
}
