import * as R from 'ramda'
import * as React from 'react'

import HomePage from '~/frontend/pages/Home'
import TestPage from '~/frontend/pages/Test'
import NotFoundPage from '~/frontend/pages/NotFound'
import LoadingOverlay from '~/frontend/components/LoadingOverlay'
import * as U from '~/frontend/routes/utils'
import Wrapper from '../components/Wrapper'

export const urls = {
  home: '/',
  test: '/test',
}

const redirectUrls = ['/auth/facebook']

export const routes = () => {
  U.route('/', () => U.renderWithLayout(<HomePage />))

  U.route('/test', () => U.render(<TestPage />, false))

  U.route('*', (context, _next) => {
    const isRedirecting = R.contains(context.canonicalPath, redirectUrls)
    if (isRedirecting) {
      U.render(<Wrapper content={<LoadingOverlay />} />)
    } else {
      U.renderWithLayout(<NotFoundPage />)
    }
  })
}
