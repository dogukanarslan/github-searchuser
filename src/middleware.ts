import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/signin'];

export const middleware = (request: NextRequest) => {
  const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const { pathname } = request.nextUrl;

  const isPublicPath = PUBLIC_PATHS.some((publicPath) =>
    pathname.startsWith(publicPath)
  );

  if (!githubToken && !isPublicPath) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  if (githubToken && pathname === '/signin') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
