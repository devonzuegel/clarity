import * as page from 'page'

import {post, sendRequest} from '../../../utils/api/responses'


export const urls = {
  signout: '/signout',
}

export const routes = () => {
  page('/signout', () => {
    sendRequest(post('/api/signout'))
      .then (() => page.redirect('/signin'))
      .catch(() => page.redirect('/signin'))
  })
}
