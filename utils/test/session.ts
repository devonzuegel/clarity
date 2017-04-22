import * as express from 'express'
import * as session from 'express-session'

export const initSession = (app: express.Application) => (
  app.use(session({
    secret: 'testsecret',
    resave: false,
    saveUninitialized: true,
  }))
)
