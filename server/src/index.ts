import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import config from './config/config.js'
import { cors } from 'hono/cors'
import ekantipurAnalytics from './routes/ekantipur/analytics.js'

const app = new Hono()

app.use('/api/*', cors({
  origin: (origin) => {
    if (!origin || config.frontendUrl.includes(origin)) {
      return origin ?? '*';
    }
    return '';
  },
  allowMethods: ['GET', 'OPTIONS'],
}));

app.get('/', (c) => {
  return c.text('working!')
})

app.route('/api/ekantipur/analytics', ekantipurAnalytics);

serve({
  fetch: app.fetch,
  port: parseInt(config.port)
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
