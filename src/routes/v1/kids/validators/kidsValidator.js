
import {z} from 'zod';


export const kidsPostValidator = z.object({

    name: z.string().min(3).max(50),
    rut: z.string().min(9).max(9),
    responsable: z.string().min(3).max(50),
    phone: z.string().min(9).max(9),
    planId: z.string().min(1)
});