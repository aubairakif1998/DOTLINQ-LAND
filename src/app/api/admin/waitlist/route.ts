import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/admin-auth';
import { listWaitlist, toCsv } from '@/lib/waitlist';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const entries = await listWaitlist();
    if (request.nextUrl.searchParams.get('format') === 'csv') {
      return new NextResponse(toCsv(entries), {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="dotlinq-waitlist.csv"',
        },
      });
    }

    return NextResponse.json({ entries });
  } catch (error) {
    console.error('[api/admin/waitlist]', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unable to load waitlist.',
      },
      { status: 500 }
    );
  }
}
