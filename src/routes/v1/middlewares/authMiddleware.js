import { eq, name } from "drizzle-orm";
import { decode, sign, verify } from "hono/jwt";
import { empresas, users } from "../../../config/schemas";
import { db } from "../../../config/db";

export async function userValidator(c, next) {
  if (await c.req.url.includes("login")) {
    let body = await c.req.formData();
    let usuario = await c.db
      .select()
      .from(c.users)
      .where(eq(c.users.email, body.get("email")));

    if (!usuario.length) {
      return c.json({ message: "User not found" }, 404);
    } else if (usuario[0].password !== body.get("password")) {
      c.status(401);
      return c.json({ message: "Invalid password" });
    }
    await c.req.parseBody();
  }

  await next();
}

export async function authMiddleware(c) {
  let token = await c.req.header("Cookie");
  let decoded = null;
  if (!token) {
    return { status: 401 };
  }

  token = token.split("=")[1];

  try {
    decoded = await verify(token, Bun.env.secret);
  } catch (err) {
    return { redirect: "/admin/login", status: 401 };
  }

  const data_usuario = await await db
    .select()
    .from(users)
    .innerJoin(empresas, eq(users.empresaId, empresas.id))
    .where(eq(users.email, decoded.email));

  c.req.validated_user = {
    email: data_usuario[0].users.email,
    name: data_usuario[0].users.name,
    role: decoded.role,
    empresa_nombre: data_usuario[0].empresas.name,
    empresa: data_usuario[0].users.empresaId,
  };
  return { status: 200 };
}
