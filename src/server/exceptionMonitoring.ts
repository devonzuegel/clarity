/**
 * Further details on Sentry setup for Express/Node:
 *   - docs.sentry.io/clients/node/integrations/express/
 *   - docs.sentry.io/clients/node/config/
 */

import * as express from 'express'
const Raven = require('raven')

interface ISentryConfig {
  sentry_dsn: string
  env: string
}

export const monitorExceptions = (config: ISentryConfig) => (
  app: express.Application
) => {
  // Must configure Raven before doing anything else with it
  Raven.config(config.sentry_dsn, {environment: config.env}).install()

  // The request handler must be the first middleware on the app
  app.use(Raven.requestHandler())

  // The error handler must be before any other error middleware
  app.use(Raven.errorHandler())
}
