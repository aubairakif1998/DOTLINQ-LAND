import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE = 'dotlinq_admin';
export const AUBAIR_ADMIN_COOKIE = 'dotlinq_aubair_admin';

export function getAdminPassword(): string | undefined {
  const password = process.env.ADMIN_PASSWORD?.trim();
  return password || undefined;
}

export function getAubairAdminCredentials(): { username: string; password: string } | null {
  const username = process.env.AUBAIR_ADMIN_USERNAME?.trim() || 'aubair';
  const password = process.env.AUBAIR_ADMIN_PASSWORD?.trim();
  if (!password) return null;
  return { username, password };
}

export function createAdminToken(password: string): string {
  return createHmac('sha256', password).update('dotlinq-landing-admin').digest('hex');
}

export function createAubairAdminToken(username: string, password: string): string {
  return createHmac('sha256', `${username}:${password}`).update('dotlinq-aubair-admin').digest('hex');
}

function safeEqualHex(expected: string, actual?: string | null): boolean {
  if (!actual) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(actual);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function isValidAdminToken(value?: string | null): boolean {
  const password = getAdminPassword();
  if (!password || !value) return false;
  return safeEqualHex(createAdminToken(password), value);
}

export function isValidAubairAdminToken(value?: string | null): boolean {
  const creds = getAubairAdminCredentials();
  if (!creds || !value) return false;
  return safeEqualHex(createAubairAdminToken(creds.username, creds.password), value);
}

/** True for either /admin or /aubairadmin session cookies. */
export async function isAdminRequest(): Promise<boolean> {
  const jar = await cookies();
  return (
    isValidAdminToken(jar.get(ADMIN_COOKIE)?.value) ||
    isValidAubairAdminToken(jar.get(AUBAIR_ADMIN_COOKIE)?.value)
  );
}

export async function isAubairAdminRequest(): Promise<boolean> {
  const jar = await cookies();
  return isValidAubairAdminToken(jar.get(AUBAIR_ADMIN_COOKIE)?.value);
}
