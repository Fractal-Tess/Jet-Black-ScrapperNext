import { Router } from '@deps'
import { gogoanimeRouter } from './gogoanime.ts'

const router = new Router()

router.prefix('anime')

router.get('/gogoanime', gogoanimeRouter.routes(), gogoanimeRouter.allowedMethods())

export { router as animeRoutes }
