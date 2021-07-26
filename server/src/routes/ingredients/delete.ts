import { Request, Response, Router } from 'express'

import NotFoundError from '@errors/not-found-error'

import { requireAuth } from '@middleware/require-auth'

import Ingredient from '@models/Ingredient'

const router = Router()

router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  const ingredient = await Ingredient.findById(req.params.id)

  if (!ingredient) throw new NotFoundError()

  ingredient.delete()

  res.status(204).send({})
})

export default router
