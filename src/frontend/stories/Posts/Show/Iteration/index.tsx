import * as React from 'react'
import * as marked from 'marked'

import * as U from '~/../utils/date.ts'
import {IterationSchema} from '~/server/db/models/iteration'

const styles = require('./styles.css')

const Show = (iteration: IterationSchema) =>
  <div>
    <h1 id="iteration-title">
      {iteration.title}
    </h1>

    <h6>
      {iteration.createdAt && U.formatDateStr(iteration.createdAt)}
    </h6>

    <div id="iteration-body">
      {iteration.body &&
        <div
          className={styles.markdown}
          dangerouslySetInnerHTML={{__html: marked(iteration.body)}}
        />}
    </div>
  </div>

export default Show
