import request from 'supertest'

import { app } from '@src/app'

const API_URL = '/api/v1/ingredients/'

it('responds to request', async () => {
  const response = await request(app).get(API_URL).send()

  expect(response.statusCode).not.toEqual(404)
})

it('responds with 200', async () => {
  await request(app).get(API_URL).send().expect(200)
})

const createIngredient = async () => {
  return request(app)
    .post(API_URL)
    .set('Cookie', await global.login())
    .send({
      name: 'Test'
    })
}

it('gets list of ingredients', async () => {
  await createIngredient()
  await createIngredient()
  await createIngredient()

  const response = await request(app).get(API_URL).send({})

  expect(response.body.length).toEqual(3)
})
