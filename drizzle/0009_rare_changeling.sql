CREATE TABLE IF NOT EXISTS "empresas" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"phone" text,
	"address" text,
	"rut" text
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "empresaId" integer NULL ;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_empresaId_empresas_id_fk" FOREIGN KEY ("empresaId") REFERENCES "public"."empresas"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
