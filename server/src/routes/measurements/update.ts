import { Request, Response, Router } from 'express'
import { body } from 'express-validator'

import NotFoundError from '@errors/not-found-error'

import { requireAuth } from '@middleware/require-auth'
import { validateRequest } from '@middleware/validate-request'

import Measurement from '@models/Measurement'

const router = Router()

router.put(
  '/:id',
  requireAuth,
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('An measurement name is required')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const measurement = await Measurement.findById(req.params.id)

    if (!measurement) throw new NotFoundError()

    const { description, name } = req.body

    measurement.set({
      description,
      name
    })

    await measurement.save()

    res.send({})
  }
)

export default router
