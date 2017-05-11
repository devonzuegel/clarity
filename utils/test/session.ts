import * as express from 'express'
import * as session from 'express-session'

export const initSession = (app: express.Application) => (
  app.use(session({
    secret: 'testsecret',
    resave: false,
    saveUninitialized: true,
  }))
)

export const mockSession = (): Express.Session => ({
  id:         'xxx',
  regenerate: (_: any) => null,
  destroy:    (_: any) => null,
  reload:     (_: any) => null,
  save:       (_: any) => null,
  touch:      (_: any) => null,
  cookie:     <Express.SessionCookie>{},
})
