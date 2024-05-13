import { Hono } from 'hono'
import { db} from './config/db'

const app = new Hono()


app.get('/', (c) => {
  return c.text('Hello Hono! pete')
})

export default app
