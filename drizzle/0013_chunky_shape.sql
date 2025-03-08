CREATE TABLE IF NOT EXISTS "extras" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"price" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "plans_extras" (
	"id" serial PRIMARY KEY NOT NULL,
	"fecha" timestamp DEFAULT now() NOT NULL,
	"planId" integer NOT NULL,
	"extraId" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "pagos" ADD COLUMN "extraId" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "plans_extras" ADD CONSTRAINT "plans_extras_planId_plans_id_fk" FOREIGN KEY ("planId") REFERENCES "public"."plans"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "plans_extras" ADD CONSTRAINT "plans_extras_extraId_extras_id_fk" FOREIGN KEY ("extraId") REFERENCES "public"."extras"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pagos" ADD CONSTRAINT "pagos_extraId_extras_id_fk" FOREIGN KEY ("extraId") REFERENCES "public"."extras"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
