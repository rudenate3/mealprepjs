import { Request, Response, Router } from 'express'
import { body } from 'express-validator'

import NotFoundError from '@errors/not-found-error'

import { requireAuth } from '@middleware/require-auth'
import { validateRequest } from '@middleware/validate-request'

import Ingredient from '@models/Ingredient'

const router = Router()

router.put(
  '/:id',
  requireAuth,
  [
    body('name').trim().notEmpty().withMessage('An ingredient name is required')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ingredient = await Ingredient.findById(req.params.id)

    if (!ingredient) throw new NotFoundError()

    const { description, name } = req.body

    ingredient.set({
      description,
      name
    })

    await ingredient.save()

    res.send({})
  }
)

export default router
