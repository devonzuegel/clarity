import * as R from 'ramda'
import * as React from 'react'
import * as page from 'page'

import TestPage from '~/frontend/pages/Test'
import NotFoundPage from '~/frontend/pages/NotFound'
import render from '~/frontend/render'
import LoadingOverlay from '~/frontend/components/LoadingOverlay'
import * as U from '~/frontend/routes/utils'

export const urls = {
  test: '/test',
  home: '/',
}

const redirectUrls = ['/auth/facebook']

export const routes = () => {
  page('/test', () => U.renderWithLayout(<TestPage />))

  page('/', () => U.renderWithLayout(<h1>Home</h1>))

  page('*', (context, _next) => {
    const isRedirecting = R.contains(context.canonicalPath, redirectUrls)
    if (isRedirecting) {
      render(<LoadingOverlay />)
    } else {
      U.renderWithLayout(<NotFoundPage />)
    }
  })
}
