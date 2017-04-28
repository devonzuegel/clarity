import * as page from 'page'

import {post, sendRequest} from '../../../utils/api/responses'


page('/logout', () => {
  sendRequest(post('/logout'))
    .then (() => page.redirect('/signin'))
    .catch(() => page.redirect('/signin'))
})

page('/login', () => {
  sendRequest(post('/login?username=bork'))
    .then (() => page.redirect('/counter'))
    .catch(() => page.redirect('/counter'))
})
