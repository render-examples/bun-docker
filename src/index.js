import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { logger } from 'hono/logger'


import { v1 } from './routes/v1'
import { admin_routes } from './routes/v1/admin/login'


const app = new Hono()

app.use('/logo.png',serveStatic({path: './static/logo.png'}))
app.use('/main.css',serveStatic({path: './static/main.css'}))
app.use(logger())

app.get('/', c => {
    return c.redirect('/admin/login')
})
app.route('/api/v1', v1)
app.route('/admin', admin_routes)

export default app
