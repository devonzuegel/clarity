import * as React    from 'react'
import * as page     from 'page'
import * as ReactDOM from 'react-dom'

import Counter from './Counter'

require('./exceptionMonitoring')

const render = (c: JSX.Element) => ReactDOM.render(c, document.getElementById('root'))

interface IPage {
  href: string
  content: JSX.Element
}

page('/params/*', (params: any) => {
  const content = (
    <div>
      <h2>
        Params:
       </h2>
      <p>
        This non-root route now works! Yay!
      </p>
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>
  )
  render(content)
})

const pages: IPage[] = [
  { href: '/counter', content: <Counter />  },
  { href: '*',        content: <h2>404</h2> },
]

pages.map(({ href, content }: IPage) => page(href, () => render(content)))

page()
