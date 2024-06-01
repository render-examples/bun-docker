ALTER TABLE "pagos" ADD COLUMN "eventoId" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pagos" ADD CONSTRAINT "pagos_eventoId_agenda_id_fk" FOREIGN KEY ("eventoId") REFERENCES "public"."agenda"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
