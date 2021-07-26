import request from 'supertest'
import mongoose from 'mongoose'

import { app } from '@src/app'

const API_URL = '/api/v1/recipes/'

it('returns 404 if recipe is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()

  await request(app)
    .put(API_URL + id)
    .set('Cookie', await global.login())
    .send({ description: 'new description', name: 'Test' })
    .expect(404)
})

it('returns 401 if user is not logged in', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()

  await request(app)
    .put(API_URL + id)
    .send({ description: 'new description', name: 'Test' })
    .expect(401)
})

it('returns 401 when the user is not owner', async () => {
  const response = await request(app)
    .post(API_URL)
    .set('Cookie', await global.login())
    .send({ description: 'description', name: 'Test' })

  await request(app)
    .put(API_URL + response.body.id)
    .set('Cookie', await global.login())
    .send({ description: 'new description', name: 'Test' })
    .expect(401)
})

describe('returns 400 when missing', () => {
  it('name', async () => {
    const cookie = await global.login()
    const response = await request(app)
      .post(API_URL)
      .set('Cookie', cookie)
      .send({ description: 'description', name: 'Test' })

    await request(app)
      .put(API_URL + response.body.id)
      .set('Cookie', cookie)
      .send({ description: 'new description' })
      .expect(400)
  })
})

it('returns 200 and updates recipe', async () => {
  const cookie = await global.login()
  const response = await request(app)
    .post(API_URL)
    .set('Cookie', cookie)
    .send({ description: 'description', name: 'Test' })

  await request(app)
    .put(API_URL + response.body.id)
    .set('Cookie', cookie)
    .send({ description: 'new description', name: 'New Test' })
    .expect(200)

  const recipe = await request(app)
    .get(API_URL + response.body.id)
    .send()

  expect(recipe.body.description).toEqual('new description')
  expect(recipe.body.name).toEqual('New Test')
})
