import * as React from 'react'
import * as page  from 'page'

import render      from '../render'
import MePage      from '../pages/Me'
import SignInPage  from '../pages/SignIn'


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
    { href: '/signin', content: <SignInPage /> },
    { href: '/me',     content: <MePage />     },
    { href: '*',       content: <h2>404</h2>   },
  ]
  pages.map(({href, content}: IPage) => page(href, () => render(content)))
}
