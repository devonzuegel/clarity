import * as React from 'react'

import Layout from '~/frontend/stories/Layout'
import render from '~/frontend/render'

export const renderWithLayout = (component: JSX.Element) =>
  render(<Layout>{component}</Layout>)
