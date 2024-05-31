import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'


import { v1 } from './routes/v1'
import { admin_routes } from './routes/v1/admin/login'


const app = new Hono()

app.use('/logo.png',serveStatic({path: './static/logo.png'}))
app.get('/', c => {
    return c.redirect('/admin/login')
})
app.route('/api/v1', v1)
app.route('/admin', admin_routes)


export default app
