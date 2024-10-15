

import { documento } from "../../../config/schemas";


class DocumentoRepository {
  constructor() {
    this.model = documento;
  }

  async create(c,data) {
    return await c.db.insert(this.model).values(data).returning();
  }
}


export { DocumentoRepository };