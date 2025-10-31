import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // This is a simple endpoint to handle NextAuth.js log requests
  // without throwing 405 errors
  return NextResponse.json({ success: true });
}

export async function GET(request: Request) {
  return NextResponse.json({ success: true });
}
