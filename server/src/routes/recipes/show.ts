import { Request, Response, Router } from 'express'

import NotFoundError from '@errors/not-found-error'

import Recipe from '@models/Recipe'

const router = Router()

router.get('/:id', async (req: Request, res: Response) => {
  const recipe = await Recipe.findById(req.params.id)

  if (!recipe) throw new NotFoundError()

  res.send(recipe)
})

export default router
