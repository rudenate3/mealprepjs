import { connectDb } from '@config/db'
import { checkEnvVariables } from '@config/env-variables'

import { app } from '@src/app'

const start = () => {
  connectDb()
  checkEnvVariables()

  app.listen(5000, () => {
    console.log('Listening on port 5000')
  })
}

start()
