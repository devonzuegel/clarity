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
}

const redirectUrls = ['/auth/facebook']

export const routes = () => {
  page('/test', () => U.renderWithLayout(<TestPage />))

  page('*', (context, _next) => {
    const isRedirecting = R.contains(context.canonicalPath, redirectUrls)
    if (isRedirecting) {
      render(<LoadingOverlay />)
    } else {
      U.renderWithLayout(<NotFoundPage />)
    }
  })
}
