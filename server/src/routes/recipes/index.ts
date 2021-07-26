import { Router } from 'express'

import createRouter from './create'
import deleteRouter from './delete'
import listRouter from './list'
import showRouter from './show'
import updateRouter from './update'

const router = Router()

router.use(createRouter)
router.use(deleteRouter)
router.use(listRouter)
router.use(showRouter)
router.use(updateRouter)

export default router
