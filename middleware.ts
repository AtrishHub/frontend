import type { NextRequest } from 'next/server';
import { auth0 } from './lib/auth0';

export async function middleware(request: NextRequest) {
  try {
    return await auth0.middleware(request);
  } catch (err) {
    console.error("Auth0 middleware error:", err);
    throw err;
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
