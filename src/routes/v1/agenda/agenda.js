import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { serveStatic } from 'hono/bun'
import { eq,and} from 'drizzle-orm';


import { agendaValidator,agendaPutValidator } from './agendaValidator'
import { agenda, pagos, plans } from '../../../config/schemas'
import { dateStringToTimestamp, timeStringToTimestamp, setMomentTimezone} from '../utils/generalUtils'
import { FormGestion } from '../../../components/admin/agenda/formGestion'

const moment = require('moment')
const agenda_router = new Hono()

agenda_router.use('/scheduler.js',serveStatic({path: './src/components/admin/agenda/handlers/scheduler.js'}))
agenda_router.use('/scheduler2.js',serveStatic({path: './node_modules/@fullcalendar/'}))

agenda_router.post('/', zValidator('json',agendaValidator),async (c) => {

    let data = await c.req.json()

    data.fecha = dateStringToTimestamp(data.fecha)
    data.start = timeStringToTimestamp(data.start)
    data.end = timeStringToTimestamp(data.end)

    let result = await c.db.insert(agenda).values(data).returning()
    if(!result) return c.text('Error al insertar la agenda', 400)

    c.header('HX-Trigger', 'refreshCalendar')
    c.status(201)
    return c.text('Evento creado!')
})


agenda_router.get('/', async (c) => {
    c.header('Content-Type','application/json')
    c.status(200)
    let data = await c.db.select().from(agenda).where(eq(plans.type,'evento')).innerJoin(plans, eq(agenda.planId, plans.id))
    data.forEach(event => {
        event.agenda.fecha = setMomentTimezone(event.agenda.fecha)
        event.agenda.start = setMomentTimezone(event.agenda.start)
        event.agenda.end = setMomentTimezone(event.agenda.end)
    });
    return c.json(data? data : [])
})

agenda_router.get('/form/:id?', async (c) => {

    let id = await c.req.param('id')
    let data = await c.db.select().from(agenda).where(eq(agenda.id, id))
                .innerJoin(plans, eq(agenda.planId, plans.id))
                .leftJoin(pagos, eq(plans.id, pagos.planId))
    
    if(data.length > 0){
        data[0].agenda.fecha = moment(data[0].agenda.fecha).format('YYYY-MM-DD')
        data[0].agenda.start = moment(data[0].agenda.start).format('HH:mm')
        data[0].agenda.end = moment(data[0].agenda.end).format('HH:mm')

    }
    
    c.header('Content-Type','text/html')
    c.status(200)
    return c.html(<FormGestion data={data? data[0] : {}}/>)
})

agenda_router.put('/:id', zValidator('json',agendaPutValidator), async (c) => {

    let id = await c.req.param('id')
    let data = await c.req.json()

    data.fecha = dateStringToTimestamp(data.fecha)
    data.start = timeStringToTimestamp(data.start)
    data.end = timeStringToTimestamp(data.end)

    let result = await c.db.update(agenda).set(data).where(eq(agenda.id, id)).returning()
    if(!result) return c.text('Error al actualizar la agenda', 400)

    c.header('HX-Trigger', 'refreshCalendar')
    c.status(200)
    return c.text('Evento actualizado!')
})




export { agenda_router }
