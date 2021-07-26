import { Router } from 'express'

import authRouter from '@routes/auth/index'
import recipesRouter from '@routes/recipes/index'

const router = Router()

router.use('/auth', authRouter)
router.use('/recipes', recipesRouter)

export default router
