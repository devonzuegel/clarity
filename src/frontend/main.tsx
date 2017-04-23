import * as React    from 'react'
import * as page     from 'page'
import * as ReactDOM from 'react-dom'

import CounterPage from './pages/Counter'
import SigninPage  from './pages/Signin'

require('./exceptionMonitoring')

const Wrapper = ({ content }: { content: JSX.Element }) => (
  <div style={{padding: '20px 50px', margin: 'auto', maxWidth: '950px'}}>
    {content}
  </div>
)

const render = (c: JSX.Element) =>
  ReactDOM.render(<Wrapper content={c} />, document.getElementById('root'))

interface IPage {
  href: string
  content: JSX.Element
}

const pages: IPage[] = [
  { href: '/signin',  content: <SigninPage />  },
  { href: '/counter', content: <CounterPage /> },
  { href: '*',        content: <h2>404</h2>    },
]

pages.map(({ href, content }: IPage) => page(href, () => render(content)))

page()
