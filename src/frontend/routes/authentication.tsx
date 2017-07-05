import * as React from 'react'
import * as page from 'page'

import render from '~/frontend/render'
import SignInPage from '~/frontend/stories/SignIn'
import SignOutPage from '~/frontend/stories/SignOut'

export const urls = {
  signIn: '/signin',
  signout: '/signout',
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

  page('/signin', () => render(<SignInPage />))
  page('/signout', () => render(<SignOutPage />))
}
