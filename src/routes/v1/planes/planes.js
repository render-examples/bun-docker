import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { eq } from 'drizzle-orm'

import { planValidator } from './validators/planValidator'
import { plans } from '../../../config/schemas'


const planes_router = new Hono()


planes_router.post('/', zValidator('form', planValidator) , async c => {

    let result = await c.db.insert(plans).values(await c.req.valid('form')).returning()
    if(!result) return c.json({message: 'Error al insertar el plan'}, 400)
    
    c.header('HX-Trigger', 'refreshTablePlans')
    c.status(201)
    return c.text('Plan insertado correctamente')
})

planes_router.get('/', async c => {    

    
    if(c.req.query('type')){
        let data = await c.db.select().from(plans).where(eq(plans.type, c.req.query('type')))
        return c.json(data)
    }

    c.header('Content-Type','application/json')
    return c.json(await c.db.select().from(plans))
})


planes_router.get('/table-content', async c => {
  
  let data = await c.db.select().from(plans)
  c.status(200)
  return c.html(c.nunjucks.render('planes/tabla-planes.html', {plans: data}))
})


planes_router.delete('/:id', async c => {
    let result = await c.db.delete(plans).where(eq(plans.id, c.req.param('id'))).returning()
    if(!result) return c.json({message: 'Error al eliminar el plan'}, 400)

    c.header('HX-Trigger', 'refreshTablePlans')
    c.status(200)
    return c.text('Plan eliminado correctamente')
})


export { planes_router}
