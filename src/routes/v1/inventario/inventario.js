
import { Hono } from "hono";


const inventario_router = new Hono();


inventario_router.get("/", async (c) => {
    return c.html(c.nunjucks.render('inventario/inventario.html'))
})


export { inventario_router };