
import {Hono} from 'hono'


const pagos_router = new Hono()


pagos_router.post('/', async c => {
    return c.text('Pagos post')
})


export {pagos_router}