DO $$ BEGIN
 ALTER TABLE "evento_extras" ADD CONSTRAINT "evento_extras_extraId_extras_id_fk" FOREIGN KEY ("extraId") REFERENCES "public"."extras"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
