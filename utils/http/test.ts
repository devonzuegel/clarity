import * as supertest from 'supertest'
import * as express from 'express'

export const bodyMatches = (expected: any, status: number = 200) => (res: any) => {
  expect(res.body).toEqual(expected)
  expect(res.status).toEqual(status)
}

export const postWithData = (
  app: express.Application,
  endpoint: string,
  data: Object,
  cb: (r: supertest.Response) => void
) =>
  supertest(app)
    .post(endpoint)
    .send(data)
    .set('Accept', 'application/json')
    .end((_err, res) => cb(res))

export const getWithData = (
  app: express.Application,
  endpoint: string,
  data: Object,
  cb: (r: supertest.Response) => void
) =>
  supertest(app)
    .get(endpoint)
    .send(data)
    .set('Accept', 'application/json')
    .end((_err, res) => cb(res))
