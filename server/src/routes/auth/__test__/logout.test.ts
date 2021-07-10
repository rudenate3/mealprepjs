import request from 'supertest'
import { app } from '@src/app'

it('clears the cookie after signing out', async () => {
  await request(app)
    .post('/api/v1/auth/register')
    .send({
      email: 'test@test.com',
      username: 'test',
      password: 'password'
    })
    .expect(201)

  const response = await request(app)
    .post('/api/v1/auth/logout')
    .send({})
    .expect(200)

  expect(response.get('Set-Cookie')).toBeDefined()
})
