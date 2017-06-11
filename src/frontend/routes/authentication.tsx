import * as React from 'react'
import * as page  from 'page'

import {renderWithLayout} from '~/frontend/routes/utils'
import SignOutPage        from '~/frontend/stories/SignOut'


export const urls = {
  signout:  '/signout',
  fbSignin: '/auth/facebook',
}

export const routes = () => {
  page('/auth/facebook', (_, next) => {
    /**
     * Still unclear why this requires two calls...
     **/
    next()
    next()
  })

  page('/signout', () => renderWithLayout(<SignOutPage />))
}
