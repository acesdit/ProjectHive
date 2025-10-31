import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from 'zod'
import { userNameValidation } from "@/schemas/signupSchema";

export async function POST(request:Request){
    try{
        await dbConnect();
        const {username,code}= await request.json()

        const decodedUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({username:decodedUsername})

        if(!user){
            return Response.json({
                success:false,
                message:'User not found'
            },{status:404})
        }

        // Check if code is expired first
        const isCodeExpired = new Date(user.verifyCodeExpired) < new Date();
        if (isCodeExpired) {
            return Response.json({
                success: false,
                message: 'Verification code has expired. Please request a new code.',
                isExpired: true
            }, {status: 401})
        }

        // Check if the code is valid
        const isCodeValid = user.verifyCode === code;
        if (!isCodeValid) {
            return Response.json({
                success: false,
                message: 'Incorrect verification code. Please try again.',
                isInvalid: true
            }, {status: 401})
        }

        // Code is valid and not expired
        user.isVerified = true;
        await user.save() 

        return Response.json({
            success: true,
            message: 'User verified successfully'
        }, {status: 200})
    } catch(error){
        console.error("Error in verifying username", error)
        return Response.json({
            success: false,
            message: 'Error in verifying user account'
        }, {status: 500})
    }
}