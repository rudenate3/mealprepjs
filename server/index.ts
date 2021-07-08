import { app } from '@src/app'

const start = () => {
  app.listen(5000, () => {
    console.log('Listening on port 5000!')
  })
}

start()
