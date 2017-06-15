import * as R     from 'ramda'
import * as React from 'react'
import * as page  from 'page'

import MePage         from '~/frontend/pages/Me'
import NotFoundPage   from '~/frontend/pages/NotFound'
import render         from '~/frontend/render'
import * as U         from '~/frontend/routes/utils'
import LoadingOverlay from  '~/frontend/components/LoadingOverlay'
import Diff           from '~/frontend/components/Diff'


export const urls = {
  me:   '/me',
  test: '/test',
}

const redirectUrls = [
  '/auth/facebook',
]

export const routes = () => {
  page('/me', U.isLoggedIn, () => U.renderWithLayout(<MePage />))
  page('/test', () => U.renderWithLayout(
    <Diff
      old='Run the initial migration to get your db in the correct state.'
      new='Run the migration to get your development db in the right state.'
    />
  ))

  page('*', (context, _next) => {
    const isRedirecting = R.contains(context.canonicalPath, redirectUrls)
    if (isRedirecting) {
      render(<LoadingOverlay />)
    } else {
      U.renderWithLayout(<NotFoundPage />)
    }
  })
}
