import { Request, Response, Router } from 'express'

import Measurement from '@models/Measurement'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  const measurements = await Measurement.find()

  res.send(measurements)
})

export default router
