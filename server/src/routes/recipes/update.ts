import { Request, Response, Router } from 'express'
import { body } from 'express-validator'

import NotAuthorizedError from '@errors/not-authorized-error'
import NotFoundError from '@errors/not-found-error'

import { requireAuth } from '@middleware/require-auth'
import { validateRequest } from '@middleware/validate-request'

import Recipe from '@models/Recipe'

const router = Router()

router.put(
  '/:id',
  requireAuth,
  [body('name').trim().notEmpty().withMessage('A name is required')],
  validateRequest,
  async (req: Request, res: Response) => {
    const recipe = await Recipe.findById(req.params.id)

    if (!recipe) throw new NotFoundError()

    if (recipe.userId.toString() !== req.currentUser!.id)
      throw new NotAuthorizedError()

    const { description, name } = req.body

    recipe.set({
      description,
      name
    })

    await recipe.save()

    res.send({})
  }
)

export default router
