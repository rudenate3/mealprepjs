import { Request, Response, Router } from 'express'
import { body } from 'express-validator'

import { requireAuth } from '@middleware/require-auth'
import { validateRequest } from '@middleware/validate-request'

import BadRequestError from '@errors/bad-request-error'

import Ingredient from '@models/Ingredient'

const router = Router()

router.post(
  '/',
  requireAuth,
  [body('name').not().isEmpty().withMessage('An ingredient name is required')],
  validateRequest,
  async (req: Request, res: Response) => {
    const { description, name } = req.body

    try {
      const ingredient = Ingredient.build({
        description,
        name
      })

      await ingredient.save()

      res.status(201).send(ingredient)
    } catch (err) {
      throw new BadRequestError(err)
    }
  }
)

export default router
