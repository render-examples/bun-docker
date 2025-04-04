import { z } from "zod";
import { documentoPagosTableValidator } from "../../documentos/validators/documento_validator";
import { documento } from "../../../../config/schemas";
import { real } from "drizzle-orm/mysql-core";

const pagoCreateValidator = z.object({
  planId: z.string().max(255).nullable().optional(),
  amount: z.string().max(255).nullable().optional(),
  documentos: z.any().optional().nullable(),
});

const pago_response_table = z.object({
  amount: z.number(),
  date: z.date().transform((val) => {
    return new Date(val).toISOString().split("T")[0];
  }),
  metodo_pago: z.string().optional().nullable(),
  comentario: z.string().optional().nullable(),
});

const pagos_wrapper = z.object({
  pagos: pago_response_table,
  documento: documentoPagosTableValidator.optional().nullable(),
});
const pago_response_list_table = z.array(pagos_wrapper);

export { pagoCreateValidator, pago_response_table, pago_response_list_table };
