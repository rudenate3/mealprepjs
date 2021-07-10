import { Response } from 'express'

import { IUserDoc } from '@models/User'

export const sendTokenResponse = (
  user: IUserDoc,
  statusCode: number,
  res: Response
) => {
  const token = user.getSignedJwtToken()

  const options = {
    expires: new Date(
      Date.now() + +process.env.JWT_EXPIRE! * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  }

  res.status(statusCode).cookie('token', token, options).json({ success: true })
}
