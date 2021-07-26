import { Request, Response, Router } from 'express'

import NotFoundError from '@errors/not-found-error'

import Ingredient from '@models/Ingredient'

const router = Router()

router.get('/:id', async (req: Request, res: Response) => {
  const ingredient = await Ingredient.findById(req.params.id)

  if (!ingredient) throw new NotFoundError()

  res.send(ingredient)
})

export default router
