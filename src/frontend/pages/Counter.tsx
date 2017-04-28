import * as React from 'react'

import Layout from '~/frontend/stories/Layout'

import Counter       from '~/frontend/stories/Counter'
import BlueprintDemo from '~/frontend/stories/BlueprintDemo'

export default () => {
  return (
    <Layout>
      <div className='pt-card'>
        <Counter />
      </div>
      <br />
      <div className='pt-card'>
        <BlueprintDemo />
      </div>
    </Layout>
  )
}
