import * as React from 'react'
import * as page  from 'page'

import MePage             from '../pages/Me'
import NotFoundPage       from '../pages/NotFound'
import SignInPage         from '../pages/SignIn'
import {renderWithLayout} from './utils'


interface IPage {
  href: string
  content: JSX.Element
}

export const urls = {
  signin:  '/signin',
  me:      '/me',
}

export const routes = () => {
  const pages: IPage[] = [
    { href: '/signin', content: <SignInPage />   },
    { href: '/me',     content: <MePage />       },
    { href: '*',       content: <NotFoundPage /> },
  ]
  pages.map(({href, content}: IPage) => page(href, () => renderWithLayout(content)))
}
