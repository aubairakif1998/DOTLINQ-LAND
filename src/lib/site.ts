const CANONICAL_PRODUCTION_URL = 'https://www.dotlinq.com';

function isLocalhostUrl(url: string): boolean {
  return /^(https?:\/\/)?(localhost|127\.0\.0\.1)(:\d+)?\/?$/i.test(url);
}

/**
 * Canonical public site origin (no trailing slash).
 * Never emit localhost in production / Vercel builds — LinkedIn and other
 * crawlers cannot fetch localhost OG images and fall back to random page shots.
 */
function resolveSiteUrl(): string {
  const fromEnv = (process.env.NEXT_PUBLIC_SITE_URL || '').trim().replace(/\/$/, '');
  const onVercel = Boolean(process.env.VERCEL);
  const isProd = process.env.NODE_ENV === 'production';

  if ((!fromEnv || isLocalhostUrl(fromEnv)) && (onVercel || isProd)) {
    return CANONICAL_PRODUCTION_URL;
  }

  if (fromEnv) return fromEnv;
  return CANONICAL_PRODUCTION_URL;
}

export const SITE_URL = resolveSiteUrl();
