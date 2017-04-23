import * as React from 'react'

import Layout from '~/frontend/components/Layout'

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
