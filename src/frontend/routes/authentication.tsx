import * as page from 'page'
import * as api  from '~/frontend/api'


export const urls = {
  signout:  '/signout',
  fbSignin: '/auth/facebook',
}

export const routes = () => {
  page('/auth/facebook', (_, next) => {
    next()
    next()
  })

  page('/signout', () => {
    api.signout()
      .then (() => page.redirect('/signin'))
      .catch(() => page.redirect('/signin'))
  })
}
