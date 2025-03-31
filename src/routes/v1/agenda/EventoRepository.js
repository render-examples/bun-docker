import { agenda } from "../../../config/schemas";

class EventosRepository {
  constructor(context) {
    this.context = context;
  }

  async put(data) {
    return await this.context.update(agenda).set(data);
  }
}

export { EventosRepository };
