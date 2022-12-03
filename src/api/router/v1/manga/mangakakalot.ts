import { Router } from '@deps'

const router = new Router()

router.get('/', ctx => {
  ctx.response.body = { message: 'mangakakalot' }
})

export { router as mangakakalotRouter }
