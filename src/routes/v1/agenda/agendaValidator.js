

import { z } from "zod";

const agendaValidator = z.object({

    evento: z.string().min(1).max(255),
    descripcion: z.string().min(1).max(255),
    fecha: z.string().min(1).max(255),
    start: z.string().min(1).max(255),
    end: z.string().min(1).max(255),
    numero_contacto: z.string().min(1).max(255),
    planId: z.string().min(1).max(255)
});

export { agendaValidator }