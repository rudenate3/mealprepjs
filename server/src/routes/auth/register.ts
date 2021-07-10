import { Request, Response, Router } from 'express'
import { body } from 'express-validator'

import { validateRequest } from '@middleware/validate-request'

import BadRequestError from '@errors/bad-request-error'

import User from '@models/User'

import { sendTokenResponse } from './helpers'

const router = Router()

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('username').trim().notEmpty().withMessage('Username must be provided'),
    body('password')
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be between 6 and 20 characters long')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, username, password } = req.body

    const emailTaken = await User.findOne({ email })
    if (emailTaken) throw new BadRequestError('Email in use')

    const usernameTaken = await User.findOne({ username })
    if (usernameTaken) throw new BadRequestError('Username in use')

    const user = User.build({ email, username, password })
    await user.save()

    sendTokenResponse(user, 201, res)
  }
)

export default router
