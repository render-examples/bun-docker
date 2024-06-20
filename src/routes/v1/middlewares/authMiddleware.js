
import { db } from "../../../config/db"
import { eq} from 'drizzle-orm';
import { decode, sign, verify } from 'hono/jwt'
import {getCookie,getSignedCookie} from 'hono/cookie'


export async function userValidator(c,next) {

    if (await c.req.url.includes('login')) {

        let body = await c.req.formData()
        let usuario = await c.db.select().from(c.users).where(eq(c.users.email, body.get('email')))
        
        if(!usuario.length) {
            return c.json({message: 'User not found'}, 404)
        }
        else if((usuario[0].password !== body.get('password'))) {
            return c.json({message: 'Invalid password'}, 401)
        }
        await c.req.parseBody()
    }   

    await next()
}


export async function authMiddleware(c) {

    let token = await c.req.header('Cookie')

    if (!token) return c.redirect('/admin/login', 401)
    
    token = token.split('=')[1]

    try{
        const decoded = await verify(token, Bun.env.secret)
        c.req.validated_user = decoded
    } catch (err) {
        console.log(err)
        c.status(401)
        return c.res.redirect('/admin/login')
    }

    return
}