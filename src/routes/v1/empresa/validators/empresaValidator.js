import { z } from "zod";

const empresaValidator = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  phone: z.string().optional(),
  email: z.string().email("Email inválido"),
  rut: z.string().min(1),
});

export { empresaValidator };
