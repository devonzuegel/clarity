import * as React from 'react'
import * as fetch from 'isomorphic-fetch'

import Counter       from '~/frontend/stories/Counter'
import BlueprintDemo from '~/frontend/stories/BlueprintDemo'

export async function getData() {
  return fetch('/data')
}

export default () => {
  getData().then((res: any) => {
    if (res.ok) {
      res.json().then((r: any) => {
        console.log(r)
      })
    } else {
      return res.json().then(console.log)
    }
  })
  return (
    <div>
      <div className='pt-card'>
        <Counter />
      </div>
      <div className='pt-card'>
        <BlueprintDemo />
      </div>
    </div>
  )
}
