import * as React from 'react'

import * as U from '~/frontend/routes/utils'
import SignInPage from '~/frontend/stories/SignIn'
import SignOutPage from '~/frontend/stories/SignOut'

export const urls = {
  signIn: '/signin',
  signout: '/signout',
  fbSignin: '/auth/facebook',
}

export const routes = () => {
  U.route('/auth/facebook', (_, next) => {
    /**
     * Still unclear why this requires two calls...
     **/
    next()
    next()
  })

  U.route('/signin', () => U.render(<SignInPage />))
  U.route('/signout', () => U.render(<SignOutPage />))
}
