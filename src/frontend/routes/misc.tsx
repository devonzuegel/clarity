import * as R from 'ramda'
import * as React from 'react'
import * as page from 'page'

import HomePage from '~/frontend/pages/Home'
import TestPage from '~/frontend/pages/Test'
import NotFoundPage from '~/frontend/pages/NotFound'
import render from '~/frontend/render'
import LoadingOverlay from '~/frontend/components/LoadingOverlay'
import * as U from '~/frontend/routes/utils'
import Wrapper from '../components/Wrapper'

export const urls = {
  home: '/',
  test: '/test',
}

const redirectUrls = ['/auth/facebook']

export const routes = () => {
  page('/', () => U.renderWithLayout(<HomePage />))

  page('/test', () => render(<TestPage />, false))

  page('*', (context, _next) => {
    const isRedirecting = R.contains(context.canonicalPath, redirectUrls)
    if (isRedirecting) {
      render(<Wrapper content={<LoadingOverlay />} />)
    } else {
      U.renderWithLayout(<NotFoundPage />)
    }
  })
}
