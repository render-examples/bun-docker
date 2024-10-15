import { z } from "zod";

const documentoPagosTableValidator = z.object({
    url: z.string().min(1).max(255).optional().nullable(),
});


export { documentoPagosTableValidator }