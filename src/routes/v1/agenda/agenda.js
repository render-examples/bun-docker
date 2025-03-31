import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { serveStatic } from "hono/bun";
import { eq, and, sql } from "drizzle-orm";

import { ExtrasRepository } from "../extras/ExtrasRepository";
import { EventosRepository } from "./EventoRepository";
import {
  agendaValidator,
  agendaPutValidator,
  agendaDeleteValidator,
} from "./agendaValidator";
import {
  agenda,
  pagos,
  plans,
  evento_extras,
  extras,
} from "../../../config/schemas";
import {
  dateStringToTimestamp,
  timeStringToTimestamp,
  setMomentTimezone,
} from "../utils/generalUtils";
import { FormGestion } from "../../../components/admin/agenda/formGestion";

const moment = require("moment");
const agenda_router = new Hono();

agenda_router.use(
  "/scheduler.js",
  serveStatic({ path: "./src/components/admin/agenda/handlers/scheduler.js" }),
);
agenda_router.use(
  "/scheduler2.js",
  serveStatic({ path: "./node_modules/@fullcalendar/" }),
);

agenda_router.post("/", zValidator("json", agendaValidator), async (c) => {
  let data = await c.req.json();

  data.fecha = dateStringToTimestamp(data.fecha);
  data.start = timeStringToTimestamp(data.start);
  data.end = timeStringToTimestamp(data.end);

  let extraRepo = new ExtrasRepository(c.db);
  let cadena_extras = data.extras.split(",");
  cadena_extras.pop();

  c.db.transaction(async (trx) => {
    let insert_evento = await c.db.insert(agenda).values(data).returning();
    if (!insert_evento) return c.text("Error al insertar la agenda", 500);

    if (cadena_extras.length > 0) {
      let extras = await extraRepo.insertMany(
        cadena_extras.map((extra) => {
          return { eventoId: insert_evento[0].id, extraId: extra };
        }),
      );
      if (!extras) return c.text("Error al insertar los extras", 500);
    }
  });

  c.header("HX-Trigger", "refreshCalendar");
  c.status(201);
  return c.text("Evento creado!");
});

agenda_router.get("/", async (c) => {
  c.header("Content-Type", "application/json");
  c.status(200);
  let data = await c.db
    .select()
    .from(agenda)
    .where(eq(plans.type, "evento"))
    .innerJoin(plans, eq(agenda.planId, plans.id));
  data.forEach((event) => {
    event.agenda.fecha = setMomentTimezone(event.agenda.fecha);
    event.agenda.start = setMomentTimezone(event.agenda.start);
    event.agenda.end = setMomentTimezone(event.agenda.end);
  });
  return c.json(data ? data : []);
});

agenda_router.get("/form/:id?", async (c) => {
  let id = await c.req.param("id");
  let data = await c.db
    .select({
      agenda: agenda,
      plans: plans,
      pagos: sql`JSON_AGG(${pagos})`,
      extras: sql`JSON_AGG(${extras})`,
    })
    .from(agenda)
    .where(eq(agenda.id, id))
    .innerJoin(plans, eq(agenda.planId, plans.id))
    .leftJoin(pagos, eq(plans.id, pagos.planId))
    .leftJoin(evento_extras, eq(agenda.id, evento_extras.eventoId))
    .leftJoin(extras, eq(evento_extras.extraId, extras.id))
    .groupBy(agenda.id, plans.id);

  if (data.length > 0) {
    data[0].agenda.fecha = moment(data[0].agenda.fecha).format("YYYY-MM-DD");
    data[0].agenda.start = moment(data[0].agenda.start).format("HH:mm");
    data[0].agenda.end = moment(data[0].agenda.end).format("HH:mm");
  }

  c.header("Content-Type", "text/html");
  c.status(200);
  return c.html(<FormGestion data={data ? data[0] : {}} />);
});

agenda_router.put("/:id", zValidator("json", agendaPutValidator), async (c) => {
  let id = await c.req.param("id");
  let { data, extras } = await c.req.valid("json");
  let extraRepo = new ExtrasRepository(c.db);
  let eventoRepo = new EventosRepository(c.db);

  try {
    await c.db.transaction(async (trx) => {
      await eventoRepo.put(data);
      await extraRepo.deleteByEventId(id);

      if (extras.length > 0) {
        let extra_result = await extraRepo.insertMany(
          extras.map((extra) => {
            return { eventoId: id, extraId: extra };
          }),
        );
      }
    });
  } catch (error) {
    console.log(error);
    return c.text("Error al actualizar la agenda", 500);
  }

  c.header("HX-Trigger", "refreshCalendar");
  c.status(200);
  return c.text("Evento actualizado!");
});

agenda_router.get("/evento/modal-confirmation", async (c) => {
  c.status(200);
  c.header("Hx-Trigger", "modalConfirmationOpen");

  let id = await c.req.query("id");
  if (!id) return c.text("Error al obtener el id del evento", 400);

  let data = {
    title: "Eliminar evento",
    message: "¿Estás seguro de que deseas eliminar este evento?",
    url: "/api/v1/agenda/evento/" + id,
    method: "delete",
  };

  return c.html(c.nunjucks.render("utils/confirmation-modal.html", data));
});

agenda_router.delete(
  "/evento/:id",
  zValidator("param", agendaDeleteValidator),
  async (c) => {
    let id = await c.req.param("id");
    let result = await c.db.delete(agenda).where(eq(agenda.id, id));
    if (!result) return c.text("Error al eliminar evento", 400);

    c.header("HX-Trigger", "refreshCalendar");
    c.status(200);
    return c.html("<p>Evento eliminado!</p>");
  },
);

export { agenda_router };
