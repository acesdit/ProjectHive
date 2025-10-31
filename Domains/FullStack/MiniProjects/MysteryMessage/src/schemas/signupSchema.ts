import {z} from 'zod'

export const userNameValidation= z
    .string() 
    .min(2,"Username must be min 2")
    .max(20,"Username must be max 20")
    .regex(/^[A-Za-z][A-Za-z0-9_]{2,15}$/,"Username must not contain special character")

export const signUpSchema = z.object({
    username : userNameValidation,
    email:z.string().email({message:'Invalid email address'}),
    password : z.string().min(6,"Password must be of 6 characters")
})

