import mongoose,{ Schema,Document} from "mongoose";

// Main - will have same systax further
export interface Message extends Document{
    content:string,
    createdAt:Date
}

const MessageSchema : Schema<Message> = new Schema({
    content:{
        type:String, //String capital in mongoose and small in typescript
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})

export interface User extends Document{
    username:string,
    email:string,
    password:string,
    verifyCode:string,
    verifyCodeExpired: Date,
    isVerified:boolean
    isAcceptingMessages:Boolean,
    messages:Message[]
}

const UserSchema : Schema<User> = new Schema({
    username:{
        type:String,
        required:[true,"User name is requied"],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,"Email is requied"],
        unique:true,
        match:[/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,"please enter valid email"]//adding rejexr
    },
    password:{
        type:String,        
        required:[true,"Email is requied"],
    },
    verifyCode:{
        type:String,        
        required:[true,"Verify code is requied"],
    },
    verifyCodeExpired:{
        type:Date,        
        required:[true,"Expiry is requied"],
    },
    isVerified:{
        type:Boolean,
        default:false        
    },
    isAcceptingMessages:{
        type:Boolean,        
        default:true
    },
    messages:[MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>)
    || mongoose.model<User>("User",UserSchema)

export default UserModel
