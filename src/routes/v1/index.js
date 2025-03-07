import { Hono } from "hono";
import nunjucks from "nunjucks";
import { join } from "path";

import { authMiddleware } from "./middlewares/authMiddleware";
import { dataIntegrityMiddleware } from "./middlewares/dataIntegrityMiddleware";
import { db } from "../../config/db";
import { kids_router } from "./kids";
import { auth_routes } from "./auth";
import { planes_router } from "./planes/planes";
import { agenda_router } from "./agenda/agenda";
import { pagos_router } from "./pagos/pagos";
import { inventario_router } from "./inventario/inventario";


const v1 = new Hono();
const nunjucks_instance = nunjucks.configure(
  join(import.meta.dir, "../../components/admin"),
  { autoescape: true, express: v1.app, noCache: true },
);


v1.use("*", async (c, next) => {

  c.db = db;
  c.nunjucks = nunjucks_instance;

  if (!(await c.req.url.includes("auth"))) {  

    const result = await authMiddleware(c,next);

    if (result.status === 401) {
      c.header("HX-Redirect", "/admin/login");
      c.status(401);
      return await next();
    }
    //const data_check = await dataIntegrityMiddleware(c, next);

  }

  return await next();
});

v1.route("/kids", kids_router);
v1.route("/planes", planes_router);
v1.route("/auth", auth_routes);
v1.route("/agenda", agenda_router);
v1.route("/pagos", pagos_router);
v1.route("/inventario", inventario_router);

export { v1 };
