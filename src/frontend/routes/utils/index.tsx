import * as React from 'react'
import * as R     from 'ramda'

import Layout       from '~/frontend/stories/Layout'
import render       from '~/frontend/render'
import Hotkeys      from '~/frontend/components/Hotkeys'
import store        from '~/frontend/redux/store'
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


export const isLoggedIn = (_context: PageJS.Context, next: () => any) => {
  const fbId = store.getState().authReducer.user.facebookId
  if (R.isNil(fbId)) {
    renderWithLayout(<NotFoundPage />)
  } else {
    next()
  }
}
