import * as express from 'express'
import * as session from 'express-session'

export const setupSession = (app: express.Application) => {
  /** More info: github.com/expressjs/session#options */
  const options: session.SessionOptions = {
    secret: 'ssshhhhh', // TODO: get secret from env
    resave: false,
    saveUninitialized: true,
  }

  app.use(session(options))
}
