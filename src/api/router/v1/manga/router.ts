import { Router } from '@deps'
import { mangakakalotRouter } from './mangakakalot.ts'

const router = new Router()

router.prefix('manga')

router.get('/mangakakalot', mangakakalotRouter.routes(), mangakakalotRouter.allowedMethods())

export { router as mangaRoutes }
