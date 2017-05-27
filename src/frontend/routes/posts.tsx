import * as React from 'react'
import * as page  from 'page'

import {renderWithLayout as layoutRender} from './utils'

import PostsPage   from '~/frontend/pages/Posts'
import PostPage    from '~/frontend/pages/Posts/Show'
import NewPostPage from '~/frontend/pages/Posts/New'


export const urls = {
  post: (id: number) => `/posts/${id}`,
  posts:                `/posts`,
  newPost:              `/posts/new`,
}

export const routes = () => {
  page('/posts/new', ({_})      => layoutRender(<NewPostPage />))
  page('/posts/:id', ({params}) => layoutRender(<PostPage postId={params.id} />))
  page('/posts',     ()         => layoutRender(<PostsPage />))
}

