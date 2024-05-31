import { z } from 'zod'


export const planValidator = z.object({
    
    name: z.string().min(3).max(255),
    price: z.string(),
    duration: z.string()
})