import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'


import { planValidator } from './validators/planValidator'
import { plans } from '../../../config/schemas'


const planes_router = new Hono()


planes_router.post('/', zValidator('json', planValidator) , async c => {

    let result = await c.db.insert(plans).values(await c.req.json()).returning()
    if(!result) return c.json({message: 'Error al insertar el plan'}, 400)
    
    c.header('HX-Trigger', 'refreshTable')
    c.status(201)
    return c.text('Plan insertado correctamente')
})

planes_router.get('/', async c => {    
    c.header('Content-Type','application/json')
    return c.json(await c.db.select().from(plans))
})


export { planes_router}
