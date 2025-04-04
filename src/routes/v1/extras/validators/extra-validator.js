
import { z } from "zod";


export const extraPostValidator = z.object({

 name : z.string().min(1).max(255),
 price : z.string().min(1).max(255)
});
