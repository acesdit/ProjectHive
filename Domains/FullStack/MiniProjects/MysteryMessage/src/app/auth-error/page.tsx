"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';

function ErrorContent() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  useEffect(() => {
    const error = searchParams.get('error');
    
    // Map error codes to user-friendly messages
    if (error) {
      switch (error) {
        case 'CredentialsSignin':
          setErrorMessage('Invalid username/email or password');
          break;
        case 'OAuthAccountNotLinked':
          setErrorMessage('Email already used with a different sign-in method');
          break;
        case 'OAuthSignin':
          setErrorMessage('Error starting Google sign-in process');
          break;
        case 'OAuthCallback':
          setErrorMessage('Error completing Google sign-in');
          break;
        case 'OAuthCreateAccount':
          setErrorMessage('Error creating account with Google');
          break;
        case 'EmailCreateAccount':
          setErrorMessage('Error creating account with email');
          break;
        case 'Callback':
          setErrorMessage('Error during authentication callback');
          break;
        case 'AccessDenied':
          setErrorMessage('Account not verified or access denied');
          break;
        case 'Verification':
          setErrorMessage('Verification error. Try again.');
          break;
        default:
          setErrorMessage(`Authentication error: ${error}`);
      }
    } else {
      setErrorMessage('Unknown authentication error');
    }
    
    // Log error details
    console.error('Auth error details:', {
      error,
      params: Object.fromEntries(searchParams.entries()),
      url: window.location.href
    });
  }, [searchParams]);
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-md w-full space-y-6 bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-md">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-red-600 dark:text-red-400">Authentication Error</h1>
          <p className="text-gray-700 dark:text-gray-300">{errorMessage}</p>
        </div>
        
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <h2 className="font-medium text-gray-800 dark:text-gray-200">Troubleshooting Steps:</h2>
            <ul className="list-disc pl-5 text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <li>Check if your email and password are correct</li>
              <li>Make sure your account is verified</li>
              <li>If using Google sign-in, try again or use email/password</li>
              <li>Clear browser cookies and cache, then try again</li>
            </ul>
          </div>
          
          <div className="pt-4 flex flex-col space-y-3">
            <Link href="/sign-in">
              <Button className="w-full" variant="default">
                Return to Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="w-full" variant="outline">
                Create New Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen flex-col items-center justify-center p-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Loading...</h1>
        </div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  );
}
