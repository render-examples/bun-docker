

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

const agendaPutValidator = z.object({
    evento: z.string().min(1).max(255).optional(),
    descripcion: z.string().min(1).max(255).optional(),
    fecha: z.string().min(1).max(255).optional(),
    start: z.string().min(1).max(255).optional(),
    end: z.string().min(1).max(255).optional(),
    numero_contacto: z.string().min(1).max(255).optional(),
    planId: z.string().min(1).max(255).optional()
});

const agendaDeleteValidator = z.object({
    id: z.string().min(1).max(255)
});

export { agendaValidator, agendaPutValidator, agendaDeleteValidator }