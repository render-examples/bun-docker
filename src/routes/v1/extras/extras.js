import {Hono} from 'hono';
import { zValidator } from "@hono/zod-validator";
import { extraPostValidator } from "./validators/extra-validator";
import { extras } from '../../../config/schemas'
import { eq } from 'drizzle-orm'


const extras_router = new Hono()


extras_router.post('/', zValidator("form", extraPostValidator) , async (c) => {
    
    let insert = await c.db.insert(extras).values(await c.req.valid('form')).returning()
    if(!insert) return c.json({message: 'Error al insertar el extra'}, 400)

    c.header('HX-Trigger', 'refreshTableExtras')
    c.status(201)
    return c.text('Extra insertado correctamente')
})


extras_router.get('/', async (c) => {

  let result = await c.db.select().from(extras)
  c.header('Content-Type','application/json')
  return c.json(result)

})


extras_router.delete('/:id', async (c) => {
    
    let result = await c.db.delete(extras).where(eq(extras.id, c.req.param('id'))).returning()
    if(!result) return c.json({message: 'Error al eliminar el extra'}, 400)

    c.header('HX-Trigger', 'refreshTableExtras')
    c.status(200)
    return c.text('Extra eliminado correctamente')
})


extras_router.get('/as-tags', async (c) => {

  let result = await c.db.select().from(extras)
  c.status(200)
  return c.html(c.nunjucks.render('extras/tags.html', {extras: result}))
})

export {extras_router}
