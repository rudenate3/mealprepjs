import request from 'supertest'
import { app } from '@src/app'

it('fails when an email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/v1/auth/login')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(400)
})

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/v1/auth/register')
    .send({
      email: 'test@test.com',
      username: 'test',
      password: 'password'
    })
    .expect(201)

  await request(app)
    .post('/api/v1/auth/login')
    .send({ email: 'test@test.com', password: 'dsafasdfds' })
    .expect(400)
})

it('responds with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/v1/auth/register')
    .send({
      email: 'test@test.com',
      username: 'test',
      password: 'password'
    })
    .expect(201)

  const response = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(200)

  expect(response.get('Set-Cookie')).toBeDefined()
})
