
import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";


const client = new Client({
    host: Bun.env.db_host,
    port: Bun.env.db_port,
    user: Bun.env.db_user,
    password: Bun.env.db_password,
    database: Bun.env.db_db
  });

await client.connect().then(() => {
    console.log("Connected to the database");
  });

const db = drizzle(client);

export {db, client}