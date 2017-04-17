import * as React    from 'react'
import * as page     from 'page'
import * as ReactDOM from 'react-dom'

import Counter from './Counter'
import Signup  from './stories/Signup'

require('./exceptionMonitoring')

const Wrapper = ({ content }: { content: JSX.Element }) => (
  <div style={{margin: '50px', maxWidth: '800px'}}>
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
  { href: '/',        content: <Signup />  },
  { href: '/counter', content: <Counter />  },
  { href: '*',        content: <h2>404</h2> },
]

pages.map(({ href, content }: IPage) => page(href, () => render(content)))

page()
