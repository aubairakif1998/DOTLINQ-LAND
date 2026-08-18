'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dotLinqTheme } from '@/lib/brand';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const body = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        setError(body?.error || 'Unable to sign in.');
        return;
      }
      router.replace('/admin');
      router.refresh();
    } catch {
      setError('Unable to sign in.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl border border-[#0B1220]/8 bg-white p-6 shadow-sm"
      >
        <BrandLogo size="md" />
        <h1 className="mt-5 text-lg font-semibold text-[#0B1220]">Waitlist insights</h1>
        <p className="mt-1 text-sm text-[#64748B]">
          Sign in to see who requested early access.
        </p>
        <div className="mt-5 grid gap-1.5">
          <Label htmlFor="admin-password">Admin password</Label>
          <Input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={submitting}
          />
        </div>
        {error ? (
          <p className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}
        <Button
          type="submit"
          disabled={submitting}
          className="mt-5 h-11 w-full rounded-xl text-white"
          style={{ background: dotLinqTheme.gradient }}
        >
          {submitting ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </main>
  );
}
