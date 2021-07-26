import { Request, Response, Router } from 'express'
import { body } from 'express-validator'

import { requireAuth } from '@middleware/require-auth'
import { validateRequest } from '@middleware/validate-request'

import BadRequestError from '@errors/bad-request-error'

import Measurement from '@models/Measurement'

const router = Router()

router.post(
  '/',
  requireAuth,
  [body('name').not().isEmpty().withMessage('An measurement name is required')],
  validateRequest,
  async (req: Request, res: Response) => {
    const { description, name } = req.body

    try {
      const measurement = Measurement.build({
        description,
        name
      })

      await measurement.save()

      res.status(201).send(measurement)
    } catch (err) {
      throw new BadRequestError(err)
    }
  }
)

export default router
