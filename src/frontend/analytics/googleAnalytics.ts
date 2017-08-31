import * as R from 'ramda'
import * as googleAnalytics from 'react-ga'

/**
 * In Google Analytics, properties correspond to what we normally
 * call "environments". For instance, there's a `heroku-develop`
 * property.
 *
 * Google Analytics is only set up for integration and live
 * environments. There is no config for local, test, or ci.
 *
 * The definition for these property-specific IDs can be found
 * under "Projects" at:
 *   https://analytics.google.com/analytics/web/?authuser=1#management/Settings/a104889483w156783557p158342983/
 */
const ids = {
  'heroku-develop': 'UA-104889483-2',
  'heroku-live': 'UA-104889483-3',
  'heroku-stage': 'UA-104889483-1',
  'heroku-tests': 'UA-104889483-4',
}

const getGoogleAnaltyicsId = (): string | null => {
  const h = window.location.href
  if (R.contains('clarity-develop.herokuapp.com', h)) return ids['heroku-develop']
  if (R.contains('clarity-live.herokuapp.com', h)) return ids['heroku-live']
  if (R.contains('thoughts.devonzuegel.com', h)) return ids['heroku-live']
  if (R.contains('clarity.ink', h)) return ids['heroku-live']
  if (R.contains('clarity-stage.herokuapp.com', h)) return ids['heroku-stage']
  if (R.contains('clarity-tests.herokuapp.com', h)) return ids['heroku-tests']
  if (R.contains('localhost', h)) return null

  throw Error(`Google Analytics config for hostname "${h}" is not defined.`)
}

const id = getGoogleAnaltyicsId()
if (id) {
  googleAnalytics.initialize(id)
} else {
  console.info('Google Analytics disabled for local & CI environments.')
}

export const middleware = (context: PageJS.Context, next: () => any) => {
  googleAnalytics.pageview(context.pathname)
  next()
}
