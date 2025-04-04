import { z } from "zod";
import {
  dateStringToTimestamp,
  timeStringToTimestamp,
} from "../utils/generalUtils";

const agendaValidator = z.object({
  evento: z.string().min(1).max(255),
  descripcion: z.string().min(1).max(255),
  fecha: z.string().min(1).max(255),
  start: z.string().min(1).max(255),
  end: z.string().min(1).max(255),
  numero_contacto: z.string().min(1).max(255),
  planId: z.string().min(1).max(255),
  extras: z.string().min(1).max(255),
});

const agendaPutValidator = z
  .object({
    evento: z.string().min(1).max(255).optional(),
    descripcion: z.string().min(1).max(255).optional(),
    fecha: z
      .string()
      .min(1)
      .max(255)
      .optional()
      .transform(dateStringToTimestamp),
    start: z
      .string()
      .min(1)
      .max(255)
      .optional()
      .transform(timeStringToTimestamp),
    end: z.string().min(1).max(255).optional().transform(timeStringToTimestamp),
    numero_contacto: z.string().min(1).max(255).optional(),
    planId: z.string().min(1).max(255).optional(),
    extras: z
      .string()
      .max(255)
      .optional()
      .transform((str) => str.split(",").filter(Boolean)),
  })
  .transform((data) => {
    if (data) {
      const { extras, ...agenda } = data;
      return { data: agenda, extras };
    }
  });

const agendaDeleteValidator = z.object({
  id: z.string().min(1).max(255),
});

export { agendaValidator, agendaPutValidator, agendaDeleteValidator };
