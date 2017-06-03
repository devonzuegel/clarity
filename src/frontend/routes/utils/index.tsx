import * as React from 'react'

import Layout  from '~/frontend/stories/Layout'
import render  from '~/frontend/render'
import Hotkeys from '~/frontend/components/Hotkeys'


export const renderWithLayout = (component: JSX.Element) => {
  const layout = (
    <Layout>
      <Hotkeys />
      {component}
    </Layout>
  )
  return render(layout)
}
