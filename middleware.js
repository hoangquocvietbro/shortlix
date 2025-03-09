import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',  // Protect dashboard
  // Add other routes you want to protect here
])

export default clerkMiddleware((auth, req) => {
  // Only protect routes that are matched by `isProtectedRoute`
  if (isProtectedRoute(req)) {
    auth().protect()
    const response = NextResponse.next();

    // Set the cookie with SameSite and Secure attributes
    response.cookies.set({
      sameSite: 'None',
      secure: true,
    });

  }
})

export const config = {
  matcher: [
    // Skip Next.js internals, static files, and exclude /sign-in and /sign-up
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}