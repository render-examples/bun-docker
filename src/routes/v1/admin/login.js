import { Hono } from 'hono'

import LoginLayout from '../../../components/admin/layouts/admin'
import AdminLayout from '../../../components/admin/layouts/home'
import Login from '../../../components/admin/login'
import Home from '../../../components/admin/home'
import Nav  from '../../../components/admin/nav'
import Agenda from '../../../components/admin/agenda'
import Planes from '../../../components/admin/planes'
import { authMiddleware } from '../middlewares/authMiddleware';


const admin_routes = new Hono()

admin_routes.use('*', async(c,next) => {

    if(!c.req.url.includes('/login')){
        let result = await authMiddleware(c)
        if(result) {
            return c.redirect('/admin/login')
        }
    }
    await next()
})

admin_routes.get('/login', (c) => {
    
    return c.html(<LoginLayout section={<Login/>}/>)
})

admin_routes.get('/home', async(c) => {
    
    return c.html(<AdminLayout nav={<Nav/>} main={<Home/>} />)
})

admin_routes.get('/agenda', async(c) => {
    
    return c.html(<AdminLayout nav={<Nav/>} main={<Agenda/>} />)
})

admin_routes.get('/planes', async(c) => {
    
    return c.html(<AdminLayout nav={<Nav/>} main={<Planes/>} />)
})


export { admin_routes }
