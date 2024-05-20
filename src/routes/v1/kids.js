import { Hono } from 'hono'

const kids_router = new Hono()


kids_router.route('/').get((c) => {
    return c.json({message: 'Hello World'})
})

export { kids_router }