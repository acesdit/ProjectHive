import {z} from 'zod'

export const signinSchema = z.object({
    identifier: z.string(),
    password: z.string(),
})