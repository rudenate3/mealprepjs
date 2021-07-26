import mongoose from 'mongoose'
import request from 'supertest'

import { app } from '@src/app'

const API_URL = '/api/v1/recipes/'

it('returns 404 when recipe does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()

  await request(app)
    .get(API_URL + id)
    .send()
    .expect(404)
})

it('returns the recipe', async () => {
  const description = 'Test description',
    name = 'Test'

  const response = await request(app)
    .post(API_URL)
    .set('Cookie', await global.login())
    .send({
      description,
      name
    })

  const recipeResponse = await request(app)
    .get(API_URL + response.body.id)
    .send()
    .expect(200)

  expect(recipeResponse.body.description).toEqual(description)
  expect(recipeResponse.body.name).toEqual(name)
})
