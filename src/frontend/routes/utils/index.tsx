import * as React from 'react'
import * as R from 'ramda'
import {Provider} from 'react-redux'
import * as ReactDOM from 'react-dom'
import * as page from 'page'

import * as GoogleAnalytics from '~/frontend/analytics/googleAnalytics'
import store from '~/frontend/redux/store'
import NotFoundPage from '~/frontend/pages/NotFound'

export const route = (path: string, ...callbacks: PageJS.Callback[]) => {
  page(path, GoogleAnalytics.middleware, ...callbacks)
}

export const isLoggedIn = (_context: PageJS.Context, next: () => any) => {
  const user = store.getState().authReducer.user
  const fbId = user && user.facebookId
  if (R.isNil(fbId)) {
    render(<NotFoundPage />)
  } else {
    next()
  }
}

export const render = (c: JSX.Element) => {
  const reduxComponent = (
    <Provider store={store}>
      <div>
        {c}
      </div>
    </Provider>
  )
  ReactDOM.render(reduxComponent, document.getElementById('root'))
}
