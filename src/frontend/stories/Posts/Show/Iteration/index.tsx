import * as React from 'react'

import {IterationSchema} from '~/server/db/models/iteration'


const Show = (iteration: IterationSchema) => (
  <div className='pt-card'>
    <h1>
      {iteration.title}
    </h1>

    <label>
      <i>
        {new Date(Date.parse(iteration.createdAt)).toLocaleString()}
      </i>
    </label>

    {iteration.body && iteration.body.split(`\n`).map((s, k) => <p key={k}>{s}</p>)}
  </div>
)

export default Show
