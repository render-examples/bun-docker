import { evento_extras, extras } from "../../../config/schemas";
import { eq, sql } from "drizzle-orm";

class ExtrasRepository {
  constructor(context) {
    this.context = context;
  }

  async insert(data) {
    return await this.context.db.insert(extras).values(data).returning();
  }

  async put(data) {
    return await this.context.update(extras).set(data);
  }

  async deleteByEventId(eventId) {
    return await this.context
      .delete(evento_extras)
      .where(eq(evento_extras.eventoId, eventId))
      .returning();
  }

  async insertMany(data) {
    return await this.context.insert(evento_extras).values(data).returning();
  }

  async getByEventId(eventId) {
    return await this.context
      .select({
        extras: sql`JSON_AGG(${extras})`,
        evento_extras: sql`JSON_AGG(${evento_extras})`,
      })
      .from(extras)
      .leftJoin(evento_extras, eq(evento_extras.eventoId, eventId));
  }
}

export { ExtrasRepository };
