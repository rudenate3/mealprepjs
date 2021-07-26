import mongoose from 'mongoose'
import request from 'supertest'

import { app } from '@src/app'

const API_URL = '/api/v1/ingredients/'

it('returns 404 when ingredient does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()

  await request(app)
    .get(API_URL + id)
    .send()
    .expect(404)
})

it('returns the ingredient', async () => {
  const description = 'Test description',
    name = 'Test'

  const response = await request(app)
    .post(API_URL)
    .set('Cookie', await global.login())
    .send({
      description,
      name
    })

  const ingredientResponse = await request(app)
    .get(API_URL + response.body.id)
    .send()
    .expect(200)

  expect(ingredientResponse.body.description).toEqual(description)
  expect(ingredientResponse.body.name).toEqual(name)
})
