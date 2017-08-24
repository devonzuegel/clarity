import * as React from 'react'

import * as U from '~/frontend/routes/utils'
import NewPostPage from '~/frontend/pages/Posts/New'

export const urls = {
  newPost: `/posts/new`,
}

export const routes = () => {
  U.route('/posts/new', U.isLoggedIn, ({_}) => {
    U.render(<NewPostPage />)
  })
}
