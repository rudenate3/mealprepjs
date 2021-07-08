import express, { Request, Response } from 'express'

const app = express()

if (process.env.NODE_ENV !== 'production') {
  app.get('/up', (_, res: Response) => res.send({ status: 'Online' }))
}

export { app }
