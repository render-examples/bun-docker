import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { empresaValidator } from "./validators/empresaValidator";

const empresa_router = new Hono();

empresa_router.post("/", zValidator("form", empresaValidator), async (c) => {
  return c.text("Hola desde la ruta de empresa");
});

export { empresa_router };
