import * as React from 'react'
import {Provider} from 'react-redux'
import * as ReactDOM from 'react-dom'
import Wrapper from '~/frontend/components/Wrapper'

import store from './redux/store'

const render = (c: JSX.Element, wrapper: boolean = true) => {
  const reduxComponent = (
    <Provider store={store}>
      {wrapper ? <Wrapper content={c} /> : c}
    </Provider>
  )
  ReactDOM.render(reduxComponent, document.getElementById('root'))
}

export default render
