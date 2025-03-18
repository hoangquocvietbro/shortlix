import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Your authentication logic here (to be added in subsequent steps)

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals, static files, and exclude /sign-in and /sign-up
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|terms|privacy)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}