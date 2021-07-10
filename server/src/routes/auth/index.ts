import { Router } from 'express'

import loginRouter from './login'
import logoutRouter from './logout'
import registerRouter from './register'

const router = Router()

router.use(loginRouter)
router.use(logoutRouter)
router.use(registerRouter)

export default router
