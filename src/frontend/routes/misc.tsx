import * as R     from 'ramda'
import * as React from 'react'
import * as page  from 'page'

import MePage         from '~/frontend/pages/Me'
import NotFoundPage   from '~/frontend/pages/NotFound'
import render         from '~/frontend/render'
import * as U         from '~/frontend/routes/utils'
import LoadingOverlay from  '~/frontend/components/LoadingOverlay'


export const urls = {
  me: '/me',
}

const redirectUrls = [
  '/auth/facebook',
]

export const routes = () => {
  page('/me', U.isLoggedIn, () => U.renderWithLayout(<MePage />))

  page('*', (context, _next) => {
    const isRedirecting = R.contains(context.canonicalPath, redirectUrls)
    if (isRedirecting) {
      render(<LoadingOverlay />)
    } else {
      U.renderWithLayout(<NotFoundPage />)
    }
  })
}
