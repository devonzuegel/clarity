import * as React    from 'react'
import {Provider}    from 'react-redux'
import * as ReactDOM from 'react-dom'

import {configureStore} from './redux/store'
import Wrapper          from './components/Wrapper'

const store = configureStore()

const render = (c: JSX.Element) => {
  const reduxComponent = (
    <Provider store={store}>
      <Wrapper content={c} />
    </Provider>
  )
  ReactDOM.render(reduxComponent, document.getElementById('root'))
}

export default render
