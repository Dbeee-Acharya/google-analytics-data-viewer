import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import analytics from './routes/analytics.js'
import { config } from './config.js'

const app = new Hono()

app.use('/*', cors({
  origin: config.frontendUrl,
}))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/analytics', analytics)

serve({
  fetch: app.fetch,
  port: config.port
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
