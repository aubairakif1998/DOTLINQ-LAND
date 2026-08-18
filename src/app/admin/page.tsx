import { redirect } from 'next/navigation';
import { isAdminRequest } from '@/lib/admin-auth';
import { getAnalyticsSummary, listWaitlist } from '@/lib/waitlist';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default async function AdminPage() {
  if (!(await isAdminRequest())) {
    redirect('/admin/login');
  }

  const [entries, stats] = await Promise.all([listWaitlist(), getAnalyticsSummary()]);
  return <AdminDashboard entries={entries} stats={stats} />;
}
