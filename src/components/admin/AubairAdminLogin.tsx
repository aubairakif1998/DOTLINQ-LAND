'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function AubairAdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/aubairadmin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const body = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        setError(body?.error || 'Unable to sign in.');
        return;
      }
      router.replace('/aubairadmin');
      router.refresh();
    } catch {
      setError('Unable to sign in.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#040914] px-4">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(14,165,233,0.22),transparent_60%)]"
        aria-hidden
      />
      <form
        onSubmit={onSubmit}
        className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_60px_-20px_rgba(56,189,248,0.45)] backdrop-blur"
      >
        <div className="inline-flex rounded-lg bg-white px-2.5 py-1.5">
          <BrandLogo size="md" />
        </div>
        <h1 className="mt-5 text-lg font-semibold text-white">Aubair admin</h1>
        <p className="mt-1 text-sm text-slate-400">Sign in to view DotLinQ waitlist signups.</p>

        <div className="mt-5 grid gap-3.5">
          <div className="grid gap-1.5">
            <Label htmlFor="aubair-username" className="text-slate-300">
              Username
            </Label>
            <Input
              id="aubair-username"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={submitting}
              className="border-white/15 bg-white/10 text-white placeholder:text-slate-500"
              placeholder="username"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="aubair-password" className="text-slate-300">
              Password
            </Label>
            <Input
              id="aubair-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={submitting}
              className="border-white/15 bg-white/10 text-white placeholder:text-slate-500"
              placeholder="••••••••"
            />
          </div>
        </div>

        {error ? (
          <p className="mt-3 rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={submitting}
          className="mt-5 h-11 w-full rounded-xl bg-gradient-to-r from-sky-400 to-cyan-500 font-semibold text-slate-950 hover:brightness-110"
        >
          {submitting ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </main>
  );
}
