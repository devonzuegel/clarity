import * as page  from 'page'

import * as Auth  from './authentication'
import * as Posts from './posts'
import * as Misc from './misc'

/**
 * This object defines all available URLs in the app.
 *
 * When specifying a link to a different page, require it from here. This allows us to
 * maintain our URLs and ensure that they match the routes that are actually defined.
 */
export const urls = {
  ...Auth.urls,
  ...Posts.urls,
  ...Misc.urls,
}

export default () => {
  Auth.routes()
  Posts.routes()
  Misc.routes()
  page()
}
