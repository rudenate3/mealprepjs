import { Request, Response, Router } from 'express'

import Recipe from '@models/Recipe'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  const recipes = await Recipe.find()

  res.send(recipes)
})

export default router
