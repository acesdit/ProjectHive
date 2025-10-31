import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession, User } from "next-auth";

export async function POST(request: Request) {
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user as User

    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: 'Not Authenticated'
            },
            { status: 401 }
        )
    }

    const userEmail = user.email;
    if (!userEmail) {
        return Response.json(
            {
                success: false,
                message: 'User email not found in session'
            },
            { status: 401 }
        )
    }

    const { acceptMessages } = await request.json()

    try {
        const userDoc = await UserModel.findOne({ email: userEmail });
        if (!userDoc) {
            return Response.json(
                {
                    success: false,
                    message: 'User not found in database'
                },
                { status: 404 }
            )
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userDoc._id,
            { isAcceptingMessages: acceptMessages },
            { new: true }
        )
        if (!updatedUser) {
            return Response.json(
                {
                    success: false,
                    message: 'failed to update user status to accept messages'
                },
                { status: 401 }
            )
        }

        return Response.json(
            {
                success: true,
                message: 'Message acceptance updated successfully', updatedUser
            },
            { status: 200 }
        )
    } catch (_) {
        console.log('failed to update user status to accept messages')
        return Response.json(
            {
                success: false,
                message: 'failed to update user status to accept messages'
            },
            { status: 500 }
        )
    }
}

export async function GET(_: Request) {
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user : User = session?.user as User 

    if(!session || !session.user){
        return Response.json(
            {
                success:false,
                message:'Not Authenticated'
            },
            {status:401}
        )
    }

    const userEmail = user.email;
    if (!userEmail) {
        return Response.json(
            {
                success:false,
                message:'User email not found in session'
            },
            {status:401}
        )
    }

    try{
        const foundUser = await UserModel.findOne({ email: userEmail });
        if (!foundUser) {
            return Response.json(
                {
                    success:false,
                    message:'User not found'
                },
                {status:404}
            )
        }
    
        return Response.json(
            {
                success:true,
                isAcceptingMessages:foundUser.isAcceptingMessages
            },
            {status:200}
        )
    }
    catch(_){
        console.log('failed to update user status to accept messages')
        return Response.json(
            {
                success:false,
                message:'Error is getting message acceptance status'
            },
            {status:500}
        )
    }
}