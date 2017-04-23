import * as React from 'react'
import * as fetch from 'isomorphic-fetch'

import Layout from '~/frontend/components/Layout'

import Signin from '~/frontend/stories/Signin'

export async function getData() {
  return fetch('/data')
}

export default () => {
  // getData().then((res: any) => {
  //   if (res.ok) {
  //     res.json().then((r: any) => {
  //       console.log(r)
  //     })
  //   } else {
  //     return res.json().then(console.log)
  //   }
  // })
  return (
    <Layout>
      <Signin />
    </Layout>
  )
}
