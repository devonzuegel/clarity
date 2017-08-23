import * as React from 'react'
import * as R from 'ramda'
import {Provider} from 'react-redux'
import * as ReactDOM from 'react-dom'
import * as page from 'page'

import * as GoogleAnalytics from '~/frontend/analytics/googleAnalytics'
import Wrapper from '~/frontend/components/Wrapper'
import Layout from '~/frontend/stories/Layout'
import Hotkeys from '~/frontend/components/Hotkeys'
import store from '~/frontend/redux/store'
import NotFoundPage from '~/frontend/pages/NotFound'

export const renderWithLayout = (component: JSX.Element) => {
  const layout = (
    <Layout>
      <Hotkeys />
      {component}
    </Layout>
  )
  return render(layout)
}

export const route = (path: string, ...callbacks: PageJS.Callback[]) => {
  page(path, GoogleAnalytics.middleware, ...callbacks)
}

export const isLoggedIn = (_context: PageJS.Context, next: () => any) => {
  const user = store.getState().authReducer.user
  const fbId = user && user.facebookId
  if (R.isNil(fbId)) {
    renderWithLayout(<NotFoundPage />)
  } else {
    next()
  }
}

export const render = (c: JSX.Element, wrapper: boolean = true) => {
  const reduxComponent = (
    <Provider store={store}>
      {wrapper ? <Wrapper content={c} /> : c}
    </Provider>
  )
  ReactDOM.render(reduxComponent, document.getElementById('root'))
}
