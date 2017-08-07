import * as React from 'react'
import * as page from 'page'

import * as U from '~/frontend/routes/utils'

import NewPostPage from '~/frontend/pages/Posts/New'

export const urls = {
  newPost: `/posts/new`,
}

export const routes = () => {
  page('/posts/new', U.isLoggedIn, ({_}) => {
    U.renderWithLayout(<NewPostPage />)
  })
}
