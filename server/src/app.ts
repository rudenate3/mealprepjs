import express, { Request, Response } from 'express'

const app = express()

app.use('/', async (req: Request, res: Response) => res.send({ success: true }))

export { app }
