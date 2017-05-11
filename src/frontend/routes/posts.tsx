import * as React from 'react'
import * as page  from 'page'

import Layout from '~/frontend/stories/Layout'

import PostPage  from '../pages/Post'
import PostsPage from '../pages/Posts'
import render    from '../render'

const renderWithLayout = (component: JSX.Element) =>
  render(<Layout>{component}</Layout>)

export default () => {
  page('/posts/:id', ({params}) => renderWithLayout(<PostPage postId={params.id} />))
  page('/posts',     ()         => renderWithLayout(<PostsPage />))
}
