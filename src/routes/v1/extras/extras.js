import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { extraPostValidator } from "./validators/extra-validator";
import { extras, evento_extras } from "../../../config/schemas";
import { eq } from "drizzle-orm";
import { ExtrasRepository } from "./ExtrasRepository";

const extras_router = new Hono();

extras_router.post("/", zValidator("form", extraPostValidator), async (c) => {
  let insert = await c.db
    .insert(extras)
    .values(await c.req.valid("form"))
    .returning();
  if (!insert) return c.json({ message: "Error al insertar el extra" }, 400);

  c.header("HX-Trigger", "refreshTableExtras");
  c.status(201);
  return c.text("Extra insertado correctamente");
});

extras_router.get("/", async (c) => {
  let result = await c.db.select().from(extras);
  c.header("Content-Type", "application/json");
  return c.json(result);
});

extras_router.delete("/:id", async (c) => {
  let result = await c.db
    .delete(extras)
    .where(eq(extras.id, c.req.param("id")))
    .returning();
  if (!result) return c.json({ message: "Error al eliminar el extra" }, 400);

  c.header("HX-Trigger", "refreshTableExtras");
  c.status(200);
  return c.text("Extra eliminado correctamente");
});

extras_router.get("/selector", async (c) => {
  let id = await c.req.param("id");

  let result = await c.db.select().from(extras);
  c.status(200);
  return c.html(c.nunjucks.render("extras/tags.html", { extras: result }));
});

extras_router.get("/selector/evento/:id", async (c) => {
  let id = await c.req.param("id");

  if (!id) return c.json({ message: "Id de evento no encontrado" }, 404);

  let extraRepo = new ExtrasRepository(c.db);
  let result = await extraRepo.getByEventId(id);

  result[0].extras.forEach((extra) => {
    if (result[0].evento_extras != null) {
      if (
        result[0].evento_extras.find((e) => {
          if (e !== null) {
            return e.extraId === extra.id;
          }
        })
      ) {
        extra.selected = true;
      }
    }
  });

  c.status(200);
  return c.html(
    c.nunjucks.render("extras/tags.html", { extras: result[0].extras }),
  );
});

export { extras_router };
