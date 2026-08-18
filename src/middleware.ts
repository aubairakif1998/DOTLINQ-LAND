import { type NextRequest, NextResponse } from 'next/server';

/**
 * Lightweight middleware — security headers + hide legacy /admin surfaces.
 * Waitlist uses server secret key; no Supabase Auth session refresh needed.
 */
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Legacy /admin UI + APIs — plain 404 (no login page / no redirect)
  if (path === '/admin' || path.startsWith('/admin/') || path.startsWith('/api/admin')) {
    return new NextResponse(null, { status: 404 });
  }

  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-Frame-Options', 'DENY');

  if (path.startsWith('/aubairadmin')) {
    response.headers.set('Cache-Control', 'no-store, max-age=0');
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
