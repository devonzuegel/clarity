/**
 * Further details on Sentry setup for Javascript/React:
 *   - docs.sentry.io/clients/javascript/
 *   - docs.sentry.io/clients/javascript/integrations/react/
 *   - docs.sentry.io/clients/javascript/config/#optional-settings
 */
import * as Raven from 'raven-js'
import * as R from 'ramda'
import {strEnum} from '~/../utils/models/index.ts'

/**
 * TODO: Extract this into config shared with Google and Heap
 * Analytics set up (and perhaps beyond), if appropriate.
 */
const Envs = strEnum([
  'ci',
  'heroku-develop',
  'heroku-live',
  'heroku-stage',
  'heroku-tests',
  'local-develop',
])

const getRavenEnvironment = () => {
  const h = window.location.href
  if (R.contains('clarity-develop.herokuapp.com', h)) return Envs['heroku-develop']
  if (R.contains('clarity-live.herokuapp.com', h)) return Envs['heroku-live']
  if (R.contains('thoughts.devonzuegel.com', h)) return Envs['heroku-live']
  if (R.contains('clarity.ink', h)) return Envs['heroku-live']
  if (R.contains('clarity-stage.herokuapp.com', h)) return Envs['heroku-stage']
  if (R.contains('clarity-tests.herokuapp.com', h)) return Envs['heroku-tests']
  if (R.contains('localhost', h)) return Envs['local-develop'] // local-develop & Circle CI

  throw Error(`Raven Sentry config for hostname "${h}" is not defined.`)
}

export default () => {
  Raven.config('https://56cd04eab54d4dae8a9349f1e9ae195e@sentry.io/159491', {
    environment: getRavenEnvironment(),
  }).install()
}
