import { Request, Response, Router } from 'express'

import NotAuthorizedError from '@errors/not-authorized-error'
import NotFoundError from '@errors/not-found-error'

import { requireAuth } from '@middleware/require-auth'

import Recipe from '@models/Recipe'

const router = Router()

router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  const recipe = await Recipe.findById(req.params.id)

  if (!recipe) throw new NotFoundError()

  if (recipe.userId.toString() !== req.currentUser!.id)
    throw new NotAuthorizedError()

  recipe.delete()

  res.status(204).send({})
})

export default router
