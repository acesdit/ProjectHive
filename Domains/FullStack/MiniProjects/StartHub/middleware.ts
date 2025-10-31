import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const isLoginPage = request.nextUrl.pathname === "/login";
  const isHomePage = request.nextUrl.pathname === "/";
  
  // If user is not logged in and accessing the main page or other protected routes, redirect to login
  if (!session && (isHomePage || (!isLoginPage && !request.nextUrl.pathname.startsWith('/api/auth')))) {
    const loginUrl = new URL("/login", request.url);
    
    // Only set callbackUrl for non-home pages to prevent redirect loops
    if (!isHomePage) {
      loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    }
    
    return NextResponse.redirect(loginUrl);
  }
  
  // If user is logged in and accessing login page, redirect to home
  if (session && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  // Add response headers to help with React hydration issues
  const response = NextResponse.next();
  
  // This header helps with form elements and browser extensions that might add attributes
  response.headers.set('x-middleware-cache', 'no-cache');
  
  return response;
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    // Match all routes except static files, api routes, and a few special paths
    '/((?!_next/static|_next/image|api/auth|favicon.ico|studio|sentry-example-page).*)',
  ],
};
