import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from 'zod'
import { userNameValidation } from "@/schemas/signupSchema";

const UsernameQuerySchema = z.object({
    username: userNameValidation
})

export async function GET(request:Request){

    await dbConnect()

    try{    
        const {searchParams}= new URL(request.url)
        const queryParams = {
            username: searchParams.get('username')
        }
        // why we wrote this localhost:3000/api/cuu?username=sujal?phone=android 
        // from this link we are extracting username through query


        // validate with zod
        const result =  UsernameQuerySchema.safeParse(queryParams)
        console.log(result)

        if(!result.success){
            const usernameError = result.error.format().username?._errors || []
            return Response.json({
                success:false,
                message:usernameError.join(", ")
            },{ status:400 })
        }
            const {username} = result.data   

            const existingVerifiedUser=await UserModel.findOne({username,isVerified:true})
            if(existingVerifiedUser){
                return Response.json({
                    success:false,
                    message:'Username already taken'
                },{status:500})
            }
            return Response.json({
                success:true,
                message:'Username is unique'
            },{status:200})
        }catch(error){
        console.error(" Error checking username ",error)
        return Response.json({
            success:false,
            message:'Error in checking user-name'
        },{status:500})
    }
}
