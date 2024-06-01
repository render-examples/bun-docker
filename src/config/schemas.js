import { serial, text, integer, primaryKey, pgTable, timestamp } from "drizzle-orm/pg-core";
export const users = pgTable( "users", {

    id: serial("id").primaryKey().notNull(),
    name: text("name"),
    email: text("email"),
    password: text("password")

}); 

export const kids = pgTable("kids",{

    id: serial("id").primaryKey().notNull(),
    name: text("name"),
    rut: text("rut"),
    responsable: text("responsable"),
    phone: text("phone"),
});

export const plans = pgTable("plans",{

    id: serial("id").primaryKey().notNull(),
    name: text("name"),
    price: integer("price"),
    duration: integer("duration"),
});

export const kids_plans = pgTable("kids_plans",{
        id: serial("id").notNull().primaryKey(),
        kidId: integer("kidId").notNull().references(() => kids.id),
        planId: integer("planId").notNull().references(()=>plans.id),
        date: timestamp("date").notNull().$default("now()")
});

export const agenda = pgTable("agenda",{

    id: serial("id").primaryKey().notNull(),
    evento: text("evento"),
    descripcion: text("descripcion"),
    fecha: timestamp("fecha").notNull(),
    start: timestamp("hora_comienzo").notNull(),
    end: timestamp("end").notNull(),
    numero_contacto: text("numero_contacto"),
    planId: integer("planId").notNull().references(()=>plans.id)
});

export const pagos = pgTable("pagos",{

    id: serial("id").primaryKey().notNull(),
    kidId: integer("kidId").references(()=>kids.id),
    planId: integer("planId").notNull().references(()=>plans.id),
    date: timestamp("date").notNull().$default("now()"),
    amount: integer("amount").notNull(),
    eventoId: integer("eventoId").references(()=>agenda.id)
});


