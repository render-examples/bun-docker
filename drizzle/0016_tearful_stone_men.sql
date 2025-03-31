ALTER TABLE "evento_extras" ADD COLUMN "eventoId" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "evento_extras" ADD CONSTRAINT "evento_extras_eventoId_agenda_id_fk" FOREIGN KEY ("eventoId") REFERENCES "public"."agenda"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
