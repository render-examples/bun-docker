ALTER TABLE "users" ALTER COLUMN "empresaId" SET NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "empresaUniqueIndex" ON "users" ("empresaId");