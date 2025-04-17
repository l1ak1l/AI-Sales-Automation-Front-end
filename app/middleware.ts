// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for the root URL
  if (request.nextUrl.pathname === '/') {
    // Redirect to the desired route, e.g., "/home"
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Allow the request to continue if not the root URL
  return NextResponse.next();
}

// Specify the paths where the middleware should run
export const config = {
  matcher: '/', // Apply this middleware only to the root path
};