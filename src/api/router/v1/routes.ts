import { Router } from '@deps'
import { animeRoutes } from './anime/routes.ts'
import { mangaRoutes } from './manga/router.ts'

const router = new Router()

router.prefix('v1')

router.use('/', animeRoutes.routes(), animeRoutes.allowedMethods())
router.use('/', mangaRoutes.routes(), animeRoutes.allowedMethods())

export { router as v1Routes }
