CREATE TABLE IF NOT EXISTS "agenda" (
	"id" serial PRIMARY KEY NOT NULL,
	"evento" text,
	"descripcion" text,
	"fecha" timestamp NOT NULL,
	"hora_comienzo" timestamp NOT NULL,
	"end" timestamp NOT NULL,
	"numero_contacto" text,
	"planId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pagos" (
	"id" serial PRIMARY KEY NOT NULL,
	"kidId" integer,
	"planId" integer NOT NULL,
	"date" timestamp NOT NULL,
	"amount" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "agenda" ADD CONSTRAINT "agenda_planId_plans_id_fk" FOREIGN KEY ("planId") REFERENCES "public"."plans"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pagos" ADD CONSTRAINT "pagos_kidId_kids_id_fk" FOREIGN KEY ("kidId") REFERENCES "public"."kids"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pagos" ADD CONSTRAINT "pagos_planId_plans_id_fk" FOREIGN KEY ("planId") REFERENCES "public"."plans"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
