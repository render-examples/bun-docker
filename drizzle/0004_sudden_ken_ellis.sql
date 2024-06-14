CREATE TABLE IF NOT EXISTS "documento" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text,
	"pagosId" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "documento" ADD CONSTRAINT "documento_pagosId_pagos_id_fk" FOREIGN KEY ("pagosId") REFERENCES "public"."pagos"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
