import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { eq, or, and } from "drizzle-orm";

import KidsList from "../../components/admin/niños/kidsList";
import { kids, kids_plans, plans } from "../../config/schemas";
import { kidsPostValidator } from "./kids/validators/kidsValidator";

const kids_router = new Hono();
const moment = require("moment-timezone");

kids_router.get("/", async (c) => {
  let kidslist = await c.db
    .select()
    .from(kids)
    .where(
      and(
        eq(plans.type, "pase"),
        or(eq(kids.status, "active"), eq(kids.status, "finish")),
      ),
    )
    .innerJoin(kids_plans, eq(kids.id, kids_plans.kidId))
    .innerJoin(plans, eq(kids_plans.planId, plans.id));

  if (c.req.header("HX-Request") === "true") {
    c.header("content-type", "text/html");
    c.status(200);
    return c.html(<KidsList data={kidslist} />);
  }
  c.status(200);
  return c.json(kidslist ? kidslist : []);
});

kids_router.post("/", zValidator("json", kidsPostValidator), async (c) => {
  let data = await c.req.valid("json");
  data.status = "active";

  let kid = await c.db.insert(kids).values(data).returning();
  if (!kid) return c.json({ message: "Error al registrar niño" }, 400);

  await c.db.insert(kids_plans).values({
    kidId: kid[0].id,
    planId: data.planId,
    date: moment.tz(moment(), "America/Santiago"),
  });
  c.status(201);
  c.header("HX-Trigger", "refreshKids");
  return c.text("Niño ingresado!");
});

kids_router.put("/:id/timer", async (c) => {
  let id = await c.req.param("id");

  let result = await c.db
    .update(kids)
    .set(await c.req.json())
    .where(eq(kids.id, id));
  if (!result) return c.json({ message: "Error al actualizar niño" }, 400);

  c.status(200);
  c.header("HX-Trigger", "refreshKids");
  return c.text("Niño actualizado!");
});

export { kids_router };
