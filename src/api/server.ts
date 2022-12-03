import { Application, oakCors } from '@deps'
import { httpError } from './middleware/error.ts'
import { json } from './middleware/json.ts'
import { timing } from './middleware/timing.ts'
import { router } from './router/router.ts'

const app = new Application()

app.use(timing)
app.use(httpError)
app.use(oakCors())
app.use(json)

app.use(router.routes())
app.use(router.allowedMethods())

export const startAPI = async () => {
  console.log('Starting server')
  await app.listen({ port: 54345, hostname: '0.0.0.0' })
}
