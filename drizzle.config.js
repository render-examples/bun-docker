
import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: './src/config/schemas.js',
  out: './drizzle',
  dialect: 'postgresql', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    url: 'postgresql://postgres:admin@localhost:5432/junglamagica',
  },
})