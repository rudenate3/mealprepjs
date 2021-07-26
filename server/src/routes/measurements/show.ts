import { Request, Response, Router } from 'express'

import NotFoundError from '@errors/not-found-error'

import Measurement from '@models/Measurement'

const router = Router()

router.get('/:id', async (req: Request, res: Response) => {
  const measurement = await Measurement.findById(req.params.id)

  if (!measurement) throw new NotFoundError()

  res.send(measurement)
})

export default router
