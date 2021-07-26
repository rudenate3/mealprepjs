import cookieParser from 'cookie-parser'
import express, { Response } from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import mongoSanitize from 'express-mongo-sanitize'

import { currentUser } from '@middleware/current-user'
import { errorHandler } from '@middleware/error-handler'

import NotFoundError from '@errors/not-found-error'

import v1Router from '@routes/v1'

const app = express()

app.use(express.json())

app.use(cookieParser())

app.use(mongoSanitize())

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

if (process.env.NODE_ENV !== 'production')
  app.get('/up', (_, res: Response) => res.send({ status: 'Online' }))

app.use(currentUser)

app.use('/api/v1', v1Router)

app.get('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
