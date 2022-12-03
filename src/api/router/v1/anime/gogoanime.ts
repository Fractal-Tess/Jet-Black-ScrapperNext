import { Router } from '@deps'

const router = new Router()

router.get('/', ctx => {
  ctx.response.body = { message: 'Gogoanime' }
})

export { router as gogoanimeRouter }
