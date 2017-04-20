/**
 * Further details on Sentry setup for Javascript/React:
 *   - docs.sentry.io/clients/javascript/
 *   - docs.sentry.io/clients/javascript/integrations/react/
 */

// TODO: Sentry Raven config should come from environment variable
import * as Raven from 'raven-js'

Raven.config('https://56cd04eab54d4dae8a9349f1e9ae195e@sentry.io/159491').install()
