import { NextRequest, NextResponse } from 'next/server';

/**
 * Handler for NextAuth internal logging requests.
 * This endpoint is called by NextAuth.js for debugging purposes.
 */
export async function POST(req: NextRequest) {
  try {
    // In production, we'll silently accept but ignore the logs
    // In development, we could log these for debugging
    if (process.env.NODE_ENV === 'development') {
      const body = await req.json();
      console.log('[NextAuth Log]', body);
    }
    
    // Return 200 OK to prevent further logging attempts
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[NextAuth Log Error]', error);
    return NextResponse.json({ success: false }, { status: 200 });
  }
} 