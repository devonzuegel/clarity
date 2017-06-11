import * as R     from 'ramda'
import * as React from 'react'
import * as page  from 'page'

import MePage             from '~/frontend/pages/Me'
import NotFoundPage       from '~/frontend/pages/NotFound'
import {renderWithLayout} from '~/frontend/routes/utils'


interface IPage {
  href: string
  content: JSX.Element
}

export const urls = {
  me: '/me',
}

const redirectUrls = [
  '/auth/facebook',
]

export const routes = () => {
  const pages: IPage[] = [
    {href: '/me', content: <MePage />},
  ]

  pages.map(({href, content}: IPage) => page(href, () => renderWithLayout(content)))

  page('*', (context, _next) => {
    const isRedirecting = R.contains(context.canonicalPath, redirectUrls)
    if (isRedirecting) {
      renderWithLayout(<h6>Redirecting...</h6>)
    } else {
      renderWithLayout(<NotFoundPage />)
    }
  })
}
