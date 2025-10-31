import { resend } from "../lib/resend";
import SimpleVerificationEmail from "../../emails/SimpleVerificationEmail";
import { APIResponse } from "@/types/APIResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string,
): Promise<APIResponse> {
        try {
        // Check if the Resend API key is configured
        const apiKey = process.env.RESEND_API_KEY || process.env.RESEND_APIKEY;
        if (!apiKey) {
            console.error("RESEND_API_KEY is not configured in environment variables");
            return { success: false, message: 'Email service not configured properly' };
        }

        // Validate inputs
        if (!email || !username || !verifyCode) {
            console.error("Missing required parameters for sending email", { email: !!email, username: !!username, verifyCode: !!verifyCode });
            return { success: false, message: 'Missing email parameters' };
        }

        console.log(`Attempting to send verification email to ${email} for username ${username}`);

        // Include plain text version for better deliverability
        const plainTextContent = `
Hello ${username},

Thank you for registering. Please use the following verification code to complete your registration:

${verifyCode}

If you did not request this code, please ignore this email.

Best regards,
Mystery Message Team
            `;

        try {
            const result = await resend.emails.send({
                from: process.env.EMAIL_FROM || 'Mystery Message <onboarding@resend.dev>',
                to: email,
                subject: 'Mystery Message Verification Code',
                react: SimpleVerificationEmail({ username, otp: verifyCode }),
                text: plainTextContent, // Fallback plain text version
            });

            console.log("Email sending result:", result);
            
            // Special handling for common Resend errors
            if (result.error) {
                // If there's a specific error about free tier restrictions
                if (result.error.message?.includes('free tier')) {
                    console.error("FREE TIER LIMITATION:", result.error.message);
                    console.log(`VERIFICATION CODE for ${username}: ${verifyCode} (showing for development only)`);
                    
                    // For development, we'll return success but log the verification code to the console
                    return {
                        success: true, 
                        message: 'FREE TIER LIMITATION: Verification code logged to console. Please upgrade your Resend plan to send to unverified emails.',
                        verificationCode: verifyCode
                    };
                }
                
                return {
                    success: false,
                    message: `Email service error: ${result.error.message || 'Unknown error'}`
                };
            }
            
            return { success: true, message: 'Verification mail sent successfully' };
        } catch (reactError) {
            // If React rendering fails, try with plain text only
            console.error("Failed to send with React template, falling back to plain text:", reactError);

            const fallbackResult = await resend.emails.send({
                from: process.env.EMAIL_FROM || 'Mystery Message <onboarding@resend.dev>',
                to: email,
                subject: 'Mystery Message Verification Code',
                text: plainTextContent,
            });

            console.log("Fallback email sending result:", fallbackResult);
            
            // Check for errors in the fallback method too
            if (fallbackResult.error) {
                // If there's a specific error about free tier restrictions
                if (fallbackResult.error.message?.includes('free tier')) {
                    console.error("FREE TIER LIMITATION:", fallbackResult.error.message);
                    console.log(`VERIFICATION CODE for ${username}: ${verifyCode} (showing for development only)`);
                    
                    // For development, we'll return success but log the verification code to the console
                    return {
                        success: true, 
                        message: 'FREE TIER LIMITATION: Verification code logged to console. Please upgrade your Resend plan to send to unverified emails.',
                        verificationCode: verifyCode
                    };
                }
                
                return {
                    success: false,
                    message: `Email service error: ${fallbackResult.error.message || 'Unknown error'}`
                };
            }
            
            return { success: true, message: 'Verification mail sent successfully (plain text)' };
        }
    } catch (emailError) {
        console.error("Error sending verification email:", emailError);
        // Return more detailed error message
        let errorDetails = 'Unknown error';

        if (emailError instanceof Error) {
            errorDetails = emailError.message;
            console.error("Error stack:", emailError.stack);

            // If the error is from the Resend API
            if ('response' in emailError && emailError.response) {
                try {
                    const responseData = JSON.stringify(emailError.response);
                    console.error("API Response data:", responseData);
                    errorDetails += ` - API Response: ${responseData}`;
                } catch (e) {
                    console.error("Could not stringify response data");
                }
            }
        }

        return {
            success: false,
            message: 'Failed to send verification mail: ' + errorDetails
        };
        }
    }