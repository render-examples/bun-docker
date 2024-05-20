
import { db } from "../../../config/db"
import { eq} from 'drizzle-orm';
import { decode, sign, verify } from 'hono/jwt'


export async function userValidator(c,next) {

    if (await c.req.url.includes('login')) {

        const body = await c.req.json()

        let usuario = await c.db.select().from(c.users).where(eq(c.users.email, body.email))
        
        if(!usuario.length) {
            return c.json({message: 'User not found'}, 404)
        }
        else if((usuario[0].password !== body.password)) {
            return c.json({message: 'Invalid password'}, 401)
        }
    }   

    await next()
}



export async function authMiddleware(c,next) {

    let token = await c.req.header('Authorization')
    token = token.replace('Bearer ', '')
    if (!token) {
        return c.json({ message: 'No token provided' }, 401)
    }

    try{
        const decoded = await verify(token, Bun.env.secret)
        c.req.validated_user = decoded
    } catch (err) {
        return c.json({ message: 'Invalid token' }, 401)
    }

    return
}