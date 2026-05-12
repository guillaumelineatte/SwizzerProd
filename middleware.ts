import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE, verifyToken } from './lib/auth';

const ADMIN_PATHS = ['/admin'];
const API_ADMIN_PATHS = ['/api/admin'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = ADMIN_PATHS.some((p) => pathname.startsWith(p));
  const isAdminApi = API_ADMIN_PATHS.some((p) => pathname.startsWith(p));

  if (!isAdminPage && !isAdminApi) return NextResponse.next();

  // La page de login est accessible sans token
  if (pathname === '/admin/login') return NextResponse.next();

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const session = token ? await verifyToken(token) : null;

  if (!session) {
    if (isAdminApi) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
