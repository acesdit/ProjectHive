import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {getToken} from "next-auth/jwt"

 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    // Use either AUTH_SECRET or NEXTAUTH_SECRET for better compatibility
    const secret = process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET;
    
    const token = await getToken({
        req: request,
        secret,
    })
    const url = request.nextUrl

    // Debug middleware execution in production
    console.log(`[Middleware] Path: ${url.pathname}, Has token: ${!!token}, Host: ${request.headers.get('host')}`);

    // If user is authenticated and trying to access auth pages, redirect to dashboard
    if(token &&(
        url.pathname.startsWith('/sign-in') ||
        url.pathname.startsWith('/sign-up') ||
        url.pathname === '/'
    ) ){
        console.log(`[Middleware] Authenticated user accessing auth page, redirecting to dashboard`);
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // If user is not authenticated and trying to access protected pages, redirect to sign-in
    if (!token && url.pathname.startsWith('/dashboard')) {
        console.log(`[Middleware] Unauthenticated user accessing dashboard, redirecting to sign-in`);
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Auth UI routes that need protection
    '/sign-in',
    '/sign-up',
    '/',
    '/dashboard/:path*'
  ]
}