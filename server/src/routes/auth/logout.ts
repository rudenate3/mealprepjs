import { Request, Response, Router } from 'express'

const router = Router()

router.post('/logout', (req: Request, res: Response) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  })

  res.status(200).json({
    success: true
  })
})

export default router
