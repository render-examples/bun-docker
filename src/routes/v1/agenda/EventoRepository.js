import { agenda } from "../../../config/schemas";
import { eq } from "drizzle-orm";

class EventosRepository {
  constructor(context) {
    this.context = context;
  }

  async put(id,data) {
    return await this.context.update(agenda).set(data).where(
      eq(agenda.id, id),
    );
  }
}

export { EventosRepository };
