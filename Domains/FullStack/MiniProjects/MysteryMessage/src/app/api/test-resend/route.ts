import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';

export async function GET() {
  try {
    console.log('================== RESEND DIAGNOSTICS ==================');
    // Check for API key presence (without revealing it)
    const apiKey = process.env.RESEND_API_KEY || process.env.RESEND_APIKEY;
    console.log('API Key configured:', !!apiKey);
    console.log('API Key format:', apiKey ? `${apiKey.substring(0, 3)}...${apiKey.substring(apiKey.length - 3)}` : 'None');
    
    // Check environment variables
    console.log('Environment variables:');
    console.log('- EMAIL_FROM:', process.env.EMAIL_FROM || 'Not set');
    console.log('- NODE_ENV:', process.env.NODE_ENV);
    
    // Create diagnostics response object
    const diagnostics = {
      apiKeyConfigured: !!apiKey,
      emailFromConfigured: !!process.env.EMAIL_FROM,
      environment: process.env.NODE_ENV || 'unknown',
      dateTime: new Date().toISOString(),
    };
    
    // Try to verify the API key by making a simple ping request
    try {
      // Make a minimal request to test authentication
      const domainResponse = await fetch('https://api.resend.com/domains', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      
      const status = domainResponse.status;
      console.log('API test status:', status);
      
      let responseBody;
      try {
        responseBody = await domainResponse.json();
        console.log('API response body:', responseBody);
      } catch (e) {
        console.log('Could not parse response body');
      }
      
      return NextResponse.json({
        success: status === 200,
        diagnostics,
        status,
        message: status === 200 
          ? 'Resend API key is valid' 
          : 'Resend API key appears to be invalid',
        apiResponse: responseBody || 'No response body'
      });
    } catch (apiError) {
      console.error('Error testing API key:', apiError);
      return NextResponse.json({
        success: false,
        diagnostics,
        message: 'Error testing Resend API key',
        error: apiError instanceof Error ? apiError.message : 'Unknown error'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Resend diagnostics error:', error);
    return NextResponse.json({
      success: false,
      message: 'Error running diagnostics',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 