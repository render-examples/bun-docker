import { empresas } from "../../../config/schemas";
import { eq } from "drizzle-orm";


export const dataIntegrityMiddleware = async (c, next) => {
    console.log(c.req.validated_user);


    const result = c.db.select().from(empresas).where(eq(empresas.id, c.req.validated_user.empresa_id))
}