import { Hono } from 'hono'
import LoginLayout from '../../../components/admin/layouts/admin'
import Login from '../../../components/admin/login'



const admin_routes = new Hono()

admin_routes.get('/login', (c) => {
    return c.html(<LoginLayout section={<Login/>}/>)
})

export { admin_routes }
