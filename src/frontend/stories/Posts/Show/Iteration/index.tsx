import * as React  from 'react'
import * as marked from 'marked'

import * as U            from '~/../utils/date.ts'
import {IterationSchema} from '~/server/db/models/iteration'

const Show = (iteration: IterationSchema) => (
  <div>
    <h1 id='iteration-title'>
      {iteration.title}
    </h1>

    <label>
      <i>
        {
          iteration.createdAt &&
          U.formatDateStr(iteration.createdAt)
        }
      </i>
    </label>

    <div id='iteration-body'>
      {
        iteration.body &&
        <br />
      }
      {
        iteration.body &&
        <div dangerouslySetInnerHTML={{
          __html: marked(iteration.body),
        }} />
      }
    </div>
  </div>
)

export default Show
