import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const error = searchParams.get("error");
  const callbackUrl = searchParams.get("callbackUrl");
  
  console.error("Authentication error details:", {
    error,
    callbackUrl,
    requestUrl: request.url,
    headers: Object.fromEntries(request.headers),
    env: {
      nextauthUrl: process.env.NEXTAUTH_URL,
      hasAuthSecret: !!process.env.AUTH_SECRET,
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      nodeEnv: process.env.NODE_ENV,
    }
  });
  
  const errorMap: Record<string, string> = {
    'CredentialsSignin': 'Invalid username/email or password',
    'OAuthAccountNotLinked': 'Email already used with different sign-in method',
    'OAuthSignin': 'Error starting Google sign-in process',
    'OAuthCallback': 'Error completing Google sign-in',
    'OAuthCreateAccount': 'Error creating account with Google',
    'EmailCreateAccount': 'Error creating account with email',
    'Callback': 'Error during authentication callback',
    'AccessDenied': 'Account not verified or access denied',
    'Verification': 'Verification error. Try again.',
  };
  
  const errorMessage = error ? (errorMap[error] || `Authentication error: ${error}`) : "Unknown authentication error";
  
  // Redirect to custom error page if not API request
  if (!request.headers.get('accept')?.includes('application/json')) {
    const errorPageUrl = new URL('/auth-error', request.url);
    errorPageUrl.searchParams.set('error', error || 'unknown');
    return NextResponse.redirect(errorPageUrl);
  }
  
  return NextResponse.json({ 
    error: error || "Unknown authentication error",
    errorMessage,
    message: "Authentication failed. Please check error details.",
    url: request.url,
    callbackUrl
  }, { status: 400 });
}
