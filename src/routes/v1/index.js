import { Hono } from 'hono'
import {authMiddleware} from './middlewares/authMiddleware'

import { kids_router } from './kids'
import { auth_routes } from './auth'

const v1 = new Hono()

v1.use('*', async(c, next) => {
    if(!await c.req.url.includes('auth')){
        const result = await authMiddleware(c, next)
        if(result){
            return result
        }
    }
    await next()
})
v1.route('/kids', kids_router)
v1.route('/auth', auth_routes)

export { v1 }
