import express, { Response } from 'express'

import morgan from 'morgan'

const app = express()

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
  app.get('/up', (_, res: Response) => res.send({ status: 'Online' }))
}

export { app }
