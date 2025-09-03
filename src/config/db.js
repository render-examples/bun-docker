import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: Bun.env.db_full_url,
});

const db = drizzle(pool);

// const client = new Client({
//   host: Bun.env.db_host,
//   port: Bun.env.db_port,
//   user: Bun.env.db_user,
//   password: Bun.env.db_password,
//   database: Bun.env.db_db,
// });

// await client
//   .connect()
//   .then(() => {
//     console.log("Connected to the database");
//   })
//   .catch((err) => {
//     console.log("Error connecting to the database", err);
//     throw err;
//   });

export { db };
