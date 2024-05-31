import { migrate } from 'drizzle-orm/mysql2/migrator';
import { db, client } from '../config/db';
import { users } from '../config/schemas';
import { eq, and, sql } from 'drizzle-orm';


// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: './drizzle' }).catch((err) => {
    console.error(err);
  })
  .then(async() => {
    console.log("Migrations ran successfully");
    let user = await db.select().from(users).where(eq(users.name,'Ruben Navarro'))
    if(!user) await db.insert(users).values({ name: 'Ruben Navarro', email: 'ruben@xar.cl', password: 'xar2024'});
  });
  await client.end();
