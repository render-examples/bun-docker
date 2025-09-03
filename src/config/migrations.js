const { migrate } = require("drizzle-orm/neon-http/migrator");
const { db } = require("../config/db");
const { users } = require("../config/schemas");
const { eq } = require("drizzle-orm");

// This will run migrations on the database, skipping the ones already applied
async function runMigrate() {
  try {
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Migraciones aplicadas con éxito");

    // Verifica si el usuario existe
    const user = await db
      .select()
      .from(users)
      .where(eq(users.name, "Ruben Navarro"));
    if (user.length === 0) {
      await db.insert(users).values({
        name: "Ruben Navarro",
        email: "ruben@xar.cl",
        password: "xar2024",
      });
      console.log("Usuario Ruben Navarro creado");
    } else {
      console.log("Usuario Ruben Navarro ya existe");
    }
  } catch (err) {
    console.error("Error en migraciones o inserción:", err);
    throw err;
  }
}

runMigrate();
