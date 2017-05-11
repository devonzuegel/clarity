import * as React from 'react'
import * as page  from 'page'

import render      from './render'
import CounterPage from './pages/Counter'
import MePage      from './pages/Me'
import SignInPage  from './pages/SignIn'

import exceptionMonitoring  from './exceptionMonitoring'
import AuthenticationRoutes from './routes/authentication'
import PostsRoutes          from './routes/posts'


interface IPage {
  href: string
  content: JSX.Element
}

const MiscRoutes = () => {
  const pages: IPage[] = [
    { href: '/signin',  content: <SignInPage />  },
    { href: '/counter', content: <CounterPage /> },
    { href: '/me',      content: <MePage />      },
    { href: '*',        content: <h2>404</h2>    },
  ]
  pages.map(({href, content}: IPage) => page(href, () => render(content)))
}

exceptionMonitoring()
AuthenticationRoutes()
PostsRoutes()
MiscRoutes()

page()
