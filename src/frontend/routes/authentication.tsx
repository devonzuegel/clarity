import * as page from 'page'

import {post, sendRequest} from '../../../utils/api/responses'


page('/logout', () => {
  sendRequest(post('/logout'))
    .then(() => page.redirect('/counter'))
    .catch(() => page.redirect('/counter'))
})

page('/login', () => {
  sendRequest(post('/login?username=bork'))
    .then(()  => page.redirect('/counter'))
    .catch(() => page.redirect('/counter'))
})
