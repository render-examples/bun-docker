CREATE TABLE IF NOT EXISTS "kids" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"rut" text,
	"responsable" text,
	"phone" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "kids_plans" (
	"id" serial PRIMARY KEY NOT NULL,
	"kidId" integer NOT NULL,
	"planId" integer NOT NULL,
	"date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "plans" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"price" integer,
	"duration" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "kids_plans" ADD CONSTRAINT "kids_plans_kidId_kids_id_fk" FOREIGN KEY ("kidId") REFERENCES "public"."kids"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "kids_plans" ADD CONSTRAINT "kids_plans_planId_plans_id_fk" FOREIGN KEY ("planId") REFERENCES "public"."plans"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
