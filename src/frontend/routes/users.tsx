import * as React from 'react'
import * as page from 'page'

import PostPage from '~/frontend/pages/Posts/Show'
import UserPage from '~/frontend/pages/Users/Show'
import * as U from '~/frontend/routes/utils'

export const urls = {
  user: (username: string) => `/@${username}`,
  post: (username: string, slug: string) => `/@${username}/${slug}`,
}

export const routes = () => {
  page('/@:username', ({params}) =>
    U.renderWithLayout(<UserPage username={params.username} />)
  )

  page('/@:username/:slug', ({params}) => {
    U.renderWithLayout(<PostPage slug={params.slug} username={params.username} />)
  })
}
