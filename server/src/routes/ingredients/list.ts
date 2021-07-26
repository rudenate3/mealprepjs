import { Request, Response, Router } from 'express'

import Ingredient from '@models/Ingredient'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  const ingredients = await Ingredient.find()

  res.send(ingredients)
})

export default router
