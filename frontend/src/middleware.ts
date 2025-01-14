import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(ru|en)/:path*'],
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token');

  const protectedPaths = ['/tasks', '/profile'];

  const pathSegments = req.nextUrl.pathname
    .split('/')
    .filter(Boolean);
  const locale = pathSegments[0];

  const isProtectedRoute = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(`/${locale}${path}`)
  );

  if (
    (isProtectedRoute ||
      req.nextUrl.pathname === `/${locale}`) &&
    !token
  ) {
    return NextResponse.redirect(
      new URL(`/${locale}/login`, req.url)
    );
  }

  return NextResponse.next();
}
