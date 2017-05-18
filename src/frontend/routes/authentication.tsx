import * as page from 'page'
import * as api  from '~/frontend/api'


export const urls = {
  signout: '/signout',
}

export const routes = () => {
  page('/signout', () => {
    api.signout()
      .then (() => page.redirect('/signin'))
      .catch(() => page.redirect('/signin'))
  })
}
