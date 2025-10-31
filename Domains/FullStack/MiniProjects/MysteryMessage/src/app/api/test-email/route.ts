import { NextResponse } from 'next/server';
import { sendPlainVerificationEmail } from '@/helpers/sendPlainVerificationEmail';

export async function GET() {
  try {
    // Log environment variables (redacted for security)
    console.log('RESEND_API_KEY configured:', !!process.env.RESEND_API_KEY);
    console.log('EMAIL_FROM configured:', !!process.env.EMAIL_FROM);
    
    // Set test recipient email
    const testEmail = process.env.TEST_EMAIL || 'test@example.com';
    console.log('Using test email:', testEmail);

    // Generate a test verification code
    const testCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Send a test email using the plain text version
    const result = await sendPlainVerificationEmail(
      testEmail,
      'testuser',
      testCode
    );

    if (!result.success) {
      return NextResponse.json({
        success: false,
        message: 'Failed to send test email',
        error: result.message
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      verificationCode: testCode
    });
  } catch (error) {
    console.error('Error in test-email route:', error);
    return NextResponse.json({
      success: false,
      message: 'Error sending test email',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 