ALTER TABLE "documento" ALTER COLUMN "pagosId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "documento" ADD COLUMN "eventoId" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "documento" ADD CONSTRAINT "documento_eventoId_agenda_id_fk" FOREIGN KEY ("eventoId") REFERENCES "public"."agenda"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
