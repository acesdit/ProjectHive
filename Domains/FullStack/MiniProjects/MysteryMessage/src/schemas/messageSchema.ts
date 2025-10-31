import {z} from 'zod'

export const messageSchema = z.object({
    content:z
    .string()
    .min(10,{message:"Content must be min 10 characters"})
    .max(300,{message:"Content must be max 300 characters"})
})