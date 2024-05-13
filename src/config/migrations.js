import { migrate } from 'drizzle-orm/mysql2/migrator';
import { db, client } from '../config/db';

// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: './drizzle' }).catch((err) => {
    console.error(err);
  })
  .then(() => {
    console.log("Migrations ran successfully");
  });

// Don't forget to close the connection, otherwise the script will hang
await client.end();