ALTER TABLE "users" ALTER COLUMN "empresaId" DROP NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "empresaUniqueIndex" ON "users" ("empresaId");