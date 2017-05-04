import * as React    from 'react'
import * as page     from 'page'
import * as ReactDOM from 'react-dom'
import {Provider}    from 'react-redux'

import {configureStore} from './redux/store'

import Wrapper     from './components/Wrapper'
import CounterPage from './pages/Counter'
import MePage      from './pages/Me'
import SignInPage  from './pages/SignIn'

require('./exceptionMonitoring')
require('./routes/authentication')

const store = configureStore()

const render = (c: JSX.Element) => {
  const reduxComponent = (
    <Provider store={store}>
      <Wrapper content={c} />
    </Provider>
  )
  ReactDOM.render(reduxComponent, document.getElementById('root'))
}

interface IPage {
  href: string
  content: JSX.Element
}

const pages: IPage[] = [
  { href: '/signin',  content: <SignInPage />   },
  { href: '/counter', content: <CounterPage /> },
  { href: '/me',      content: <MePage />      },
  { href: '*',        content: <h2>404</h2>    },
]

pages.map(({ href, content }: IPage) => page(href, () => render(content)))

page()
