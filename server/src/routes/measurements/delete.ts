import { Request, Response, Router } from 'express'

import NotFoundError from '@errors/not-found-error'

import { requireAuth } from '@middleware/require-auth'

import Measurement from '@models/Measurement'

const router = Router()

router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  const measurement = await Measurement.findById(req.params.id)

  if (!measurement) throw new NotFoundError()

  measurement.delete()

  res.status(204).send({})
})

export default router
