import React from 'react';

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function SimpleVerificationEmail({ username, otp }: VerificationEmailProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ padding: '20px', backgroundColor: '#f7f7f7', textAlign: 'center' }}>
        <h1 style={{ color: '#333', fontSize: '24px' }}>Mystery Message</h1>
      </div>
      
      <div style={{ padding: '20px' }}>
        <h2 style={{ color: '#333', fontSize: '20px' }}>Hello {username},</h2>
        
        <p style={{ color: '#555', fontSize: '16px', lineHeight: '1.5' }}>
          Thank you for registering. Please use the following verification code to complete your registration:
        </p>
        
        <div style={{ 
          backgroundColor: '#f0f0f0', 
          padding: '15px', 
          margin: '20px 0', 
          borderRadius: '4px',
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'center',
          letterSpacing: '2px'
        }}>
          {otp}
        </div>
        
        <p style={{ color: '#555', fontSize: '16px', lineHeight: '1.5' }}>
          If you did not request this code, please ignore this email.
        </p>
        
        <p style={{ color: '#555', fontSize: '16px', lineHeight: '1.5', marginTop: '30px' }}>
          Best regards,<br />
          Mystery Message Team
        </p>
      </div>
      
      <div style={{ padding: '20px', backgroundColor: '#f7f7f7', textAlign: 'center', fontSize: '12px', color: '#777' }}>
        &copy; {new Date().getFullYear()} Mystery Message. All rights reserved.
      </div>
    </div>
  );
} 