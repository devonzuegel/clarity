import * as React from 'react'
import * as page from 'page'

import * as U from '~/frontend/routes/utils'

import PostPage from '~/frontend/pages/Posts/Show'
import NewPostPage from '~/frontend/pages/Posts/New'

export const urls = {
  post: (id: number) => `/posts/${id}`,
  newPost: `/posts/new`,
}

export const routes = () => {
  page('/posts/new', U.isLoggedIn, ({_}) => {
    U.renderWithLayout(<NewPostPage />)
  })

  page('/posts/:id', ({params}) => {
    U.renderWithLayout(<PostPage postId={params.id} />)
  })
}
