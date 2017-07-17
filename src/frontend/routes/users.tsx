import * as React from 'react'
import * as page from 'page'

import UserPage from '~/frontend/pages/Users/Show'
import * as U from '~/frontend/routes/utils'

export const urls = {
  user: (username: string) => `/@${username}`,
}

export const routes = () => {
  page('/@:username', ({params}) =>
    U.renderWithLayout(<UserPage username={params.username} />)
  )
}
