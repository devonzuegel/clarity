import * as React    from 'react'
import {Provider}    from 'react-redux'
import * as ReactDOM from 'react-dom'

import store   from './redux/store'
import Wrapper from './components/Wrapper'


const render = (c: JSX.Element) => {
  const reduxComponent = (
    <Provider store={store}>
      <Wrapper content={c} />
    </Provider>
  )
  ReactDOM.render(reduxComponent, document.getElementById('root'))
}

export default render
