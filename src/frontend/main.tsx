import * as React    from 'react'
import * as page     from 'page'
import * as ReactDOM from 'react-dom'

import Wrapper     from './components/Wrapper'
import CounterPage from './pages/Counter'
import MePage      from './pages/Me'
import SigninPage  from './pages/Signin'

require('./exceptionMonitoring')
require('./routes/authentication')

const render = (c: JSX.Element) =>
  ReactDOM.render(<Wrapper content={c} />, document.getElementById('root'))

interface IPage {
  href: string
  content: JSX.Element
}

const pages: IPage[] = [
  { href: '/signin',  content: <SigninPage />  },
  { href: '/counter', content: <CounterPage /> },
  { href: '/me',      content: <MePage />      },
  { href: '*',        content: <h2>404</h2>    },
]

pages.map(({ href, content }: IPage) => page(href, () => render(content)))

page()
