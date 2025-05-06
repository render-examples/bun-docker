import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { decode, sign, verify } from "hono/jwt";
import { setCookie, deleteCookie } from "hono/cookie";

import { users } from "../../config/schemas";
import { loginValidator } from "./validators/authValidator";
import { userValidator } from "./middlewares/authMiddleware";
import { validator } from "hono/validator";

const auth_routes = new Hono();

auth_routes.use("*", async (c, next) => {
  c.users = users;
  await next();
});
auth_routes.use("*", userValidator);

auth_routes.post(
  "/login",
  validator("form", async (value, c) => {
    let parsed = loginValidator.safeParse(await c.req.parseBody());

    if (!parsed.success) return c.json({ message: parsed.error.errors }, 400);

    return parsed.data;
  }),
  async (c) => {
    const payload = {
      email: await c.req.bodyCache.parsedBody.email,
      role: "admin",
      //token expires in 5 hours
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 5,
    };

    let token = await sign(payload, Bun.env.secret);
    setCookie(c, "auth_token", token, {
      httpOnly: true,
      maxAge: 3600,
      18000: "strict",
    });
    c.status(200);
    return c.text("Bienvenido!... Redirigiendo a la página de inicio.");
  },
);

auth_routes.get("/logout", async (c) => {
  deleteCookie(c, "auth_token");
  c.status(200);
  c.header("Hx-Redirect", "/admin/login");
  return c.text("Sesión cerrada correctamente.");
});

auth_routes.post("/register", async (c) => {});

export { auth_routes };
