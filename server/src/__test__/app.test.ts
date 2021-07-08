import request from 'supertest'
import { app } from '@src/app'

it('responds 200 with a status of Online', async () => {
  const response = await request(app).get('/up').send().expect(200)

  expect(response.body.status).toEqual('Online')
})
