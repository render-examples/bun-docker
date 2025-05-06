import {
  serial,
  text,
  integer,
  primaryKey,
  pgTable,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const empresas = pgTable("empresas", {
  id: serial("id").primaryKey().notNull(),
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  rut: text("rut"),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey().notNull(),
  name: text("name"),
  email: text("email"),
  password: text("password"),
  empresaId: integer("empresaId").references(() => empresas.id),
});

export const roles = pgTable("roles", {
  id: serial("id").primaryKey().notNull(),
  name: text("name"),
});

export const users_roles = pgTable("users_roles", {
  id: serial("id").primaryKey().notNull(),
  userId: integer("userId")
    .notNull()
    .references(() => users.id),
  roleId: integer("roleId")
    .notNull()
    .references(() => roles.id),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const permissions = pgTable("permissions", {
  id: serial("id").primaryKey().notNull(),
  name: text("name"),
  description: text("description"),
});

export const roles_permissions = pgTable("roles_permissions", {
  id: serial("id").primaryKey().notNull(),
  roleId: integer("roleId")
    .notNull()
    .references(() => roles.id),
  permissionId: integer("permissionId")
    .notNull()
    .references(() => permissions.id),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const kids = pgTable("kids", {
  id: serial("id").primaryKey().notNull(),
  name: text("name"),
  rut: text("rut"),
  responsable: text("responsable"),
  status: text("status"),
  phone: text("phone"),
});

export const plans = pgTable("plans", {
  id: serial("id").primaryKey().notNull(),
  name: text("name"),
  price: integer("price"),
  duration: integer("duration"),
  type: text("type"),
});

export const extras = pgTable("extras", {
  id: serial("id").primaryKey().notNull(),
  name: text("name"),
  price: integer("price"),
});

export const evento_extras = pgTable("evento_extras", {
  id: serial("id").notNull().primaryKey(),
  date: timestamp("fecha").notNull().defaultNow(),
  eventoId: integer("eventoId")
    .notNull()
    .references(() => agenda.id),
  extraId: integer("extraId")
    .notNull()
    .references(() => extras.id, { onDelete: "cascade" }),
});

export const kids_plans = pgTable("kids_plans", {
  id: serial("id").notNull().primaryKey(),
  kidId: integer("kidId")
    .notNull()
    .references(() => kids.id),
  planId: integer("planId")
    .notNull()
    .references(() => plans.id),
  date: timestamp("date").notNull().defaultNow(),
});

export const agenda = pgTable("agenda", {
  id: serial("id").primaryKey().notNull(),
  evento: text("evento"),
  descripcion: text("descripcion"),
  fecha: timestamp("fecha").notNull(),
  start: timestamp("hora_comienzo").notNull(),
  end: timestamp("end").notNull(),
  numero_contacto: text("numero_contacto"),
  planId: integer("planId")
    .notNull()
    .references(() => plans.id),
});

export const pagos = pgTable("pagos", {
  id: serial("id").primaryKey().notNull(),
  kidId: integer("kidId").references(() => kids.id),
  planId: integer("planId")
    .notNull()
    .references(() => plans.id),
  date: timestamp("date").notNull().defaultNow(),
  amount: integer("amount").notNull(),
  comentario: text("comentario"),
  metodo_pago: text("metodo_pago"),
  eventoId: integer("eventoId").references(() => agenda.id),
  extraId: integer("extraId").references(() => extras.id),
});

export const documento = pgTable("documento", {
  id: serial("id").primaryKey().notNull(),
  url: text("url"),
  pagosId: integer("pagosId").references(() => pagos.id),
  eventoId: integer("eventoId").references(() => agenda.id),
});
