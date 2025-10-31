import {resend} from "../lib/resend";
import { APIResponse } from "@/types/APIResponse";

export async function sendPlainVerificationEmail(
    email: string,
    username: string,
    verifyCode: string,
): Promise<APIResponse> {
    try {
        // Check if the Resend API key is configured (support both formats)
        const apiKey = process.env.RESEND_API_KEY || process.env.RESEND_APIKEY;
        if (!apiKey) {
            console.error("Resend API key is not configured in environment variables");
            return {success: false, message: 'Email service not configured properly'};
        }

        // Validate inputs
        if (!email || !username || !verifyCode) {
            console.error("Missing required parameters for sending email", { email: !!email, username: !!username, verifyCode: !!verifyCode });
            return {success: false, message: 'Missing email parameters'};
        }
        
        // Get the developer email for free tier restrictions
        const developerEmail = process.env.DEVELOPER_EMAIL || 'sujalpawar00007@gmail.com';
        
        // In free tier, redirect emails to the developer's email address
        // In production with a verified domain, send to the actual recipient
        const hasVerifiedDomain = process.env.HAS_VERIFIED_DOMAIN === 'true';
        const targetEmail = hasVerifiedDomain ? email : developerEmail;
        
        console.log(`Attempting to send verification email for: ${username} (${email})`);
        if (targetEmail !== email) {
            console.log(`FREE TIER MODE: Redirecting email to developer address: ${targetEmail}`);
        }
        
        // Plain text version
        const plainText = `
Hello ${username},

Thank you for registering. Please use the following verification code to complete your registration:

${verifyCode}

If you did not request this code, please ignore this email.

Best regards,
Mystery Message Team
        `;
        
        // Simple HTML version
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Verification Code</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
    <div style="background-color: #f7f7f7; padding: 20px; text-align: center;">
        <h1 style="color: #333; margin: 0;">Mystery Message</h1>
    </div>
    
    <div style="padding: 20px;">
        <h2 style="color: #333;">Hello ${username},</h2>
        
        <p>Thank you for registering. Please use the following verification code to complete your registration:</p>
        
        <div style="background-color: #f0f0f0; padding: 15px; margin: 20px 0; border-radius: 4px; font-size: 24px; font-weight: bold; text-align: center; letter-spacing: 2px;">
            ${verifyCode}
        </div>
        
        <p>If you did not request this code, please ignore this email.</p>
        
        <p style="margin-top: 30px;">
            Best regards,<br>
            Mystery Message Team
        </p>
    </div>
    
    <div style="background-color: #f7f7f7; padding: 20px; text-align: center; font-size: 12px; color: #777;">
        &copy; ${new Date().getFullYear()} Mystery Message. All rights reserved.
    </div>
</body>
</html>
        `;
        
        // Add the intended recipient in the subject line when redirecting
        const subject = targetEmail !== email 
            ? `Mystery Message Verification Code for ${email} (${username})`
            : 'Mystery Message Verification Code';
        
        console.log("Sending email with API key:", apiKey ? "API key is set" : "No API key");
        
        const result = await resend.emails.send({
            from: process.env.EMAIL_FROM || 'Mystery Message <onboarding@resend.dev>',
            to: targetEmail,
            subject: subject,
            html: htmlContent,
            text: plainText,
        });
        
        console.log("Email sending result:", result);
        
        // Special handling for common Resend errors
        if (result.error) {
            // Handle domain verification errors
            if (result.error.message?.includes('verify a domain') || 
                result.error.message?.includes('your own email address')) {
                console.error("FREE TIER LIMITATION:", result.error.message);
                console.log(`VERIFICATION CODE for ${username}: ${verifyCode} (showing for development only)`);
                
                // Return success but include the verification code in the response
                return {
                    success: true, 
                    message: 'Email could not be sent due to Resend free tier limitations. Please check the console for the verification code.',
                    verificationCode: verifyCode
                };
            }
            
            return {
                success: false,
                message: `Email service error: ${result.error.message || 'Unknown error'}`
            };
        }
        
        // If we redirected the email to the developer, include the verification code in the response
        if (targetEmail !== email) {
            return {
                success: true, 
                message: 'Verification code sent to developer email. Check the UI for your code.',
                verificationCode: verifyCode
            };
        }
        
        return {success: true, message: 'Verification mail sent successfully'};
    } catch (emailError) {
        console.error("Error sending verification email:", emailError);
        let errorDetails = 'Unknown error';
        
        if (emailError instanceof Error) {
            errorDetails = emailError.message;
            console.error("Error stack:", emailError.stack);
            
            if ('response' in emailError && emailError.response) {
                try {
                    const responseData = JSON.stringify(emailError.response);
                    console.error("API Response data:", responseData);
                    errorDetails += ` - API Response: ${responseData}`;
                } catch (e) {
                    console.error("Could not stringify response data",e);
                }
            }
        }
        
        return {
            success: false, 
            message: 'Failed to send verification mail: ' + errorDetails
        };
    }
} 