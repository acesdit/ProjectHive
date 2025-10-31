import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from 'bcryptjs'
import { sendPlainVerificationEmail } from "@/helpers/sendPlainVerificationEmail";
import { NextResponse } from 'next/server';
// In your check-username-unique API route
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { UsernameQuerySchema } from "@/schemas/usernameSchema";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const queryParams = Object.fromEntries(request.nextUrl.searchParams);
    const result = UsernameQuerySchema.safeParse(queryParams);
    
    if (!result.success) {
      const usernameError = result.error.format().username?._errors || [];
      return Response.json({
        success: false,
        message: usernameError.join(", ")
      }, { status: 400 });
    }
    
    const { username } = result.data;
    
    // Check if any user (verified or not) has this username
    const existingUser = await UserModel.findOne({ username });
    
    if (existingUser) {
      return Response.json({
        success: false,
        message: 'Username already taken'
      }, { status: 200 }); // Using 200 because this is an expected result
    }
    
    return Response.json({
      success: true,
      message: 'Username is unique'
    }, { status: 200 });
  } catch (error) {
    console.error("Error checking username:", error);
    return Response.json({
      success: false,
      message: 'Error checking username'
    }, { status: 500 });
  }
}
export async function POST(request: Request) {
    await dbConnect()

    try {
        const body = await request.json()
        const { username, password, email, resendCode } = body

        // If this is a request to resend verification code
        if (resendCode && username) {
            const user = await UserModel.findOne({ username });
            
            if (!user) {
                return NextResponse.json({
                    success: false,
                    message: "User not found"
                }, { status: 404 });
            }
            
            if (user.isVerified) {
                return NextResponse.json({
                    success: false,
                    message: "User is already verified"
                }, { status: 400 });
            }
            
            // Generate new verification code
            const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
            user.verifyCode = verifyCode;
            user.verifyCodeExpired = new Date(Date.now() + 3600000); // 1 hour expiry
            await user.save();
            
            // Send new verification email
            try {
                const emailResponse = await sendPlainVerificationEmail(
                    user.email,
                    user.username,
                    verifyCode
                );
                
                // For development: include verification code in the response
                const isDev = process.env.NODE_ENV !== 'production';
                
                return NextResponse.json({
                    success: true,
                    message: "Verification code resent successfully. Please check your email.",
                    ...(isDev && emailResponse.verificationCode ? { verificationCode: emailResponse.verificationCode } : {})
                }, { status: 200 });
            } catch (emailError) {
                console.error("Failed to send verification email:", emailError);
                return NextResponse.json({
                    success: false,
                    message: "Failed to send verification email. Please try again."
                }, { status: 500 });
            }
        }

        // Regular sign up flow (not resending)
        // Check for ANY existing user with this username (not just verified)
        const existingUserByUsername = await UserModel.findOne({ username })

        if (existingUserByUsername) {
            // Return 409 Conflict (better status for duplicates than 400)
            return NextResponse.json({
                success: false,
                message: "Username already taken"
            }, { status: 409 }) // Using 409 Conflict for duplicate resources
        }

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
        
        // Rest of your existing email check logic
        const existingUserByEmail = await UserModel.findOne({ email })
        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return NextResponse.json({
                    success: false,
                    message: "User already exists with this email"
                }, { status: 400 })
            } else {
                const hashedPassword = await bcrypt.hash(password, 10)
                existingUserByEmail.password = hashedPassword
                existingUserByEmail.verifyCode = verifyCode
                existingUserByEmail.verifyCodeExpired = new Date(Date.now() + 3600000)
                await existingUserByEmail.save()

                // Try to send verification email with the plain function
                try {
                    const emailResponse = await sendPlainVerificationEmail(
                        email,
                        username,
                        verifyCode
                    )
                    
                    // For development: pass the verification code in the response
                    const isDev = process.env.NODE_ENV !== 'production';
                    
                    return NextResponse.json({
                        success: true,
                        message: "User already exists with this email. Please verify your email again",
                        ...(isDev && emailResponse.verificationCode ? { verificationCode: emailResponse.verificationCode } : {})
                    }, { status: 200 })
                } catch (emailError) {
                    console.error("Failed to send verification email:", emailError)
                    // Continue anyway as the user record is updated
                    return NextResponse.json({
                        success: true,
                        message: "User updated, but could not send verification email. Please try resending the code."
                    }, { status: 200 })
                }
            }
        } else {
            // No existing user, create new one
            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpired: expiryDate,
                isVerified: false,
                isAcceptingMessages: true,
                messages: []
            })

            try {
                await newUser.save()
            } catch (saveError) {
                // Handle MongoDB duplicate key errors specifically
                if (typeof saveError === 'object' && saveError !== null && 'code' in saveError && (saveError as any).code === 11000) {
                    if ('keyPattern' in saveError && (saveError as any).keyPattern?.username) {
                        return NextResponse.json({
                            success: false,
                            message: "Username already taken (duplicate detected)"
                        }, { status: 409 })
                    } else if ('keyPattern' in saveError && (saveError as any).keyPattern?.email) {
                        return NextResponse.json({
                            success: false,
                            message: "Email address already in use"
                        }, { status: 409 })
                    }
                }
                throw saveError // Re-throw other save errors
            }

            // Send verification email with plain function
            const emailResponse = await sendPlainVerificationEmail(
                email,
                username,
                verifyCode
            )

            if (!emailResponse.success) {
                return NextResponse.json({
                    success: false,
                    message: emailResponse.message
                }, { status: 500 })
            }

            // For development: include verification code in the response
            const isDev = process.env.NODE_ENV !== 'production';
            
            return NextResponse.json({
                success: true,
                message: "User registered successfully. Please verify your email",
                ...(isDev && emailResponse.verificationCode ? { verificationCode: emailResponse.verificationCode } : {})
            }, { status: 201 })
        }

    } catch (error) {
        console.error("Error registering user", error)
        return NextResponse.json(
            {
                success: false,
                message: "Error registering user"
            }, {
                status: 500
            }
        )
    }
}