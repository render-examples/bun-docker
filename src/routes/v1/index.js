import { Hono } from 'hono'
import {authMiddleware} from './middlewares/authMiddleware'

import { db } from '../../config/db'
import { kids_router } from './kids'
import { auth_routes } from './auth'
import { planes_router} from './planes/planes'
import { agenda_router } from './agenda/agenda'
import { pagos_router } from './pagos/pagos'


const v1 = new Hono()

v1.use('*', async(c, next) => {
    if(!await c.req.url.includes('auth')){
        const result = await authMiddleware(c, next)
        if(result){
            return result
        }
    }
    c.db = db
    await next()
})
v1.route('/kids', kids_router)
v1.route('/planes', planes_router)
v1.route('/auth', auth_routes)
v1.route('/agenda', agenda_router)
v1.route('/pagos', pagos_router)

export { v1 }
