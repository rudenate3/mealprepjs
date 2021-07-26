import request from 'supertest'
import mongoose from 'mongoose'

import { app } from '@src/app'

const API_URL = '/api/v1/ingredients/'

it('returns 404 if ingredient is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()

  await request(app)
    .delete(API_URL + id)
    .set('Cookie', await global.login())
    .send()
    .expect(404)
})

it('returns 401 if user is not logged in', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()

  await request(app)
    .delete(API_URL + id)
    .send()
    .expect(401)
})

it('returns 204 and removes ingredient', async () => {
  const cookie = await global.login()
  const response = await request(app)
    .post(API_URL)
    .set('Cookie', cookie)
    .send({ description: 'description', name: 'Test' })

  await request(app)
    .delete(API_URL + response.body.id)
    .set('Cookie', cookie)
    .send()
    .expect(204)

  await request(app)
    .get(API_URL + response.body.id)
    .send()
    .expect(404)
})
