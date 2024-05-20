import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'

import { decode, sign, verify } from 'hono/jwt'

import { db } from '../../config/db'
import { users } from '../../config/schemas'
import { loginValidator } from './validators/authValidator'
import { userValidator } from './middlewares/authMiddleware';


const auth_routes = new Hono()

auth_routes.use('*', async(c,next) => {
    c.db = db
    c.users = users
    await next()
})
auth_routes.use('*', userValidator)


auth_routes.post('/login', zValidator('json', loginValidator), async(c) => {


    const payload = {
        email: await c.req.json().email,
        role: 'admin',
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expires in 1 hour
    }

    return c.json({token: await sign(payload, Bun.env.secret)})
    
})


export { auth_routes }
