import { Router } from 'express'

import authRouter from '@routes/auth/index'

const router = Router()

router.use('/auth', authRouter)

export default router
