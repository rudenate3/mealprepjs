import { Request, Response, Router } from 'express'
import { body } from 'express-validator'

import { requireAuth } from '@middleware/require-auth'
import { validateRequest } from '@middleware/validate-request'

import BadRequestError from '@errors/bad-request-error'

import Recipe from '@models/Recipe'

const router = Router()

router.post(
  '/',
  requireAuth,
  [body('name').not().isEmpty().withMessage('A recipe name is required')],
  validateRequest,
  async (req: Request, res: Response) => {
    const { description, name } = req.body

    try {
      const recipe = Recipe.build({
        description,
        name,
        userId: req.currentUser!.id
      })

      await recipe.save()

      res.status(201).send(recipe)
    } catch (err) {
      throw new BadRequestError(err)
    }
  }
)

export default router
