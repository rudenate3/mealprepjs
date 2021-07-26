import request from 'supertest'

import { app } from '@src/app'

import Measurement from '@models/Measurement'

const API_URL = '/api/v1/measurements/'

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

it('creates a measurement', async () => {
  await request(app)
    .post(API_URL)
    .set('Cookie', await global.login())
    .send({
      name: 'Test'
    })
    .expect(201)

  const measurement = await Measurement.find({})
  expect(measurement.length).toEqual(1)
})
