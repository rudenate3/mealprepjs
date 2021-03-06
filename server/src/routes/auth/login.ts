import { Request, Response, Router } from 'express'
import { body } from 'express-validator'

import BadRequestError from '@errors/bad-request-error'

import { validateRequest } from '@middleware/validate-request'

import User from '@models/User'

import { sendTokenResponse } from './helpers'

const router = Router()

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email }).select('+password')
    if (!existingUser) throw new BadRequestError('Invalid Credentials')

    const passwordsMatch = await existingUser.matchPassword(password)
    if (!passwordsMatch) throw new BadRequestError('Invalid Credentials')

    sendTokenResponse(existingUser, 200, res)
  }
)

export default router
