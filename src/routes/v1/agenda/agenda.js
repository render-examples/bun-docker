import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'

import { agendaValidator } from './agendaValidator'
import { agenda } from '../../../config/schemas'
import { dateStringToTimestamp, timeStringToTimestamp, setMomentTimezone} from '../utils/generalUtils'


const agenda_router = new Hono()

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
    let data = await c.db.select().from(agenda)
    data.forEach(event => {
        event.fecha = setMomentTimezone(event.fecha).toDate()
        event.start = setMomentTimezone(event.start).toDate()
        event.end = setMomentTimezone(event.end).toDate()
    });
    return c.json(data? data : [])
})

export { agenda_router }
