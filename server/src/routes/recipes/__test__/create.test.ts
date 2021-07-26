import request from 'supertest'

import { app } from '@src/app'

import Recipe from '@models/Recipe'

const API_URL = '/api/v1/recipes/'

it('responds to request', async () => {
  const response = await request(app).post(API_URL).send({})

  expect(response.statusCode).not.toEqual(404)
})

it('requires user to be authorized', async () => {
  await request(app).post(API_URL).send({}).expect(401)
})

it('does not return 401 when logged in', async () => {
  const response = await request(app)
    .post(API_URL)
    .set('Cookie', await global.login())
    .send({})

  expect(response.statusCode).not.toEqual(401)
})

describe('returns an error when name is invalid', () => {
  it('empty', async () => {
    await request(app)
      .post(API_URL)
      .set('Cookie', await global.login())
      .send({
        name: ''
      })
      .expect(400)
  })

  it('missing', async () => {
    await request(app)
      .post(API_URL)
      .set('Cookie', await global.login())
      .send({})
      .expect(400)
  })
})

it('creates a recipe', async () => {
  await request(app)
    .post(API_URL)
    .set('Cookie', await global.login())
    .send({
      name: 'Test'
    })
    .expect(201)

  const recipe = await Recipe.find({})
  expect(recipe.length).toEqual(1)
})
