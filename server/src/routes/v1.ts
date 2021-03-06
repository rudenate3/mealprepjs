import { Router } from 'express'

import authRouter from '@routes/auth/index'
import ingredientsRouter from '@routes/ingredients/index'
import measurementsRouter from '@routes/measurements/index'
import recipesRouter from '@routes/recipes/index'

const router = Router()

router.use('/auth', authRouter)
router.use('/ingredients', ingredientsRouter)
router.use('/measurements', measurementsRouter)
router.use('/recipes', recipesRouter)

export default router
