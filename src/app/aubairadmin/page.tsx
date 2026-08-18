import { isAubairAdminRequest } from '@/lib/admin-auth';
import { getAnalyticsSummary, listWaitlist } from '@/lib/waitlist';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AubairAdminLogin } from '@/components/admin/AubairAdminLogin';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default async function AubairAdminPage() {
  if (!(await isAubairAdminRequest())) {
    return <AubairAdminLogin />;
  }

  try {
    const [entries, stats] = await Promise.all([listWaitlist(), getAnalyticsSummary()]);

    return (
      <AdminDashboard
        entries={entries}
        stats={stats}
        title="Aubair waitlist"
        logoutApi="/api/aubairadmin/logout"
        loginPath="/aubairadmin"
        csvPath="/api/aubairadmin/waitlist?format=csv"
      />
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to load waitlist.';
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#040914] px-4">
        <div className="max-w-md rounded-2xl border border-red-400/30 bg-red-500/10 p-6 text-center text-red-100">
          <h1 className="text-lg font-semibold text-white">Waitlist unavailable</h1>
          <p className="mt-2 text-sm text-red-200/90">{message}</p>
          <p className="mt-4 text-xs text-slate-400">
            Check SUPABASE_SECRET_KEY and that migrations have been applied.
          </p>
        </div>
      </main>
    );
  }
}
