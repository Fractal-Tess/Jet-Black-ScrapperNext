import { Router } from '@deps'
import { v1Routes } from './v1/routes.ts'

const router = new Router()

router.get('/', ctx => {
  ctx.response.body = {
    message: 'Welcome to Jet-Black API! 🎉'
  }
})

router.use('/api/', v1Routes.routes(), v1Routes.allowedMethods())

export { router }
