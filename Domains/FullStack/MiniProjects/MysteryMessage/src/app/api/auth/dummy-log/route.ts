import { NextRequest, NextResponse } from 'next/server';

/**
 * Dummy handler for NextAuth _log endpoint
 * This silently accepts all POST requests and returns 200 OK
 * Used to prevent 405 errors in production deployments
 */
export async function POST(req: NextRequest) {
  // Don't do anything with the request, just return OK
  return NextResponse.json({ success: true });
} 