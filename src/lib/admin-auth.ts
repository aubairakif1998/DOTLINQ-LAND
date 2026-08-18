import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

export const AUBAIR_ADMIN_COOKIE = 'dotlinq_aubair_admin';

export function getAubairAdminCredentials(): { username: string; password: string } | null {
  const username = process.env.AUBAIR_ADMIN_USERNAME?.trim() || 'aubair';
  const password = process.env.AUBAIR_ADMIN_PASSWORD?.trim();
  if (!password) return null;
  return { username, password };
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

export function isValidAubairAdminToken(value?: string | null): boolean {
  const creds = getAubairAdminCredentials();
  if (!creds || !value) return false;
  return safeEqualHex(createAubairAdminToken(creds.username, creds.password), value);
}

export async function isAubairAdminRequest(): Promise<boolean> {
  const jar = await cookies();
  return isValidAubairAdminToken(jar.get(AUBAIR_ADMIN_COOKIE)?.value);
}
