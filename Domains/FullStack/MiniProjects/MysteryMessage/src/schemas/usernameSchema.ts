import { z } from 'zod';
 
export const UsernameQuerySchema = z.object({
  username: z.string().min(3).max(20),
}); 