import * as React from 'react'

import {render, route} from '~/frontend/routes/utils'
import SignInPage from '~/frontend/stories/SignIn'
import SignOutPage from '~/frontend/stories/SignOut'

export const urls = {
  signIn: '/signin',
  signout: '/signout',
  fbSignin: '/auth/facebook',
}

export const routes = () => {
  route('/auth/facebook', (_, next) => {
    /**
     * Still unclear why this requires two calls...
     **/
    next()
    next()
  })

  route('/signin', () => render(<SignInPage />))
  route('/signout', () => render(<SignOutPage />))
}
